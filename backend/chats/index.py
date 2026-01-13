import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для работы с чатами в Lites мессенджер"""
    
    method = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': ''
        }
    
    db_url = os.environ['DATABASE_URL']
    schema = os.environ['MAIN_DB_SCHEMA']
    
    conn = psycopg2.connect(db_url)
    cur = conn.cursor(cursor_factory=RealDictCursor)
    
    cur.execute(f'SET search_path TO {schema}')
    
    if method == 'GET':
        params = event.get('queryStringParameters') or {}
        user_id = params.get('user_id')
        
        if not user_id:
            cur.close()
            conn.close()
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'user_id обязателен'})
            }
        
        cur.execute('''
            SELECT 
                c.id, 
                c.name, 
                c.avatar, 
                c.type,
                cm.is_pinned,
                COALESCE(
                    (SELECT COUNT(*) FROM messages m 
                     WHERE m.chat_id = c.id AND m.is_read = FALSE AND m.sender_id != %s), 
                    0
                ) as unread,
                COALESCE(
                    (SELECT m.text FROM messages m 
                     WHERE m.chat_id = c.id 
                     ORDER BY m.created_at DESC LIMIT 1),
                    ''
                ) as last_message,
                COALESCE(
                    (SELECT TO_CHAR(m.created_at, 'HH24:MI') FROM messages m 
                     WHERE m.chat_id = c.id 
                     ORDER BY m.created_at DESC LIMIT 1),
                    ''
                ) as timestamp
            FROM chats c
            INNER JOIN chat_members cm ON c.id = cm.chat_id
            WHERE cm.user_id = %s
            ORDER BY 
                (SELECT MAX(m.created_at) FROM messages m WHERE m.chat_id = c.id) DESC NULLS LAST
        ''', (user_id, user_id))
        
        chats = cur.fetchall()
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps([dict(chat) for chat in chats])
        }
    
    elif method == 'POST':
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'create':
            name = body.get('name')
            avatar = body.get('avatar')
            chat_type = body.get('type')
            creator_id = body.get('creator_id')
            member_ids = body.get('member_ids', [])
            
            cur.execute(
                'INSERT INTO chats (name, avatar, type, creator_id) VALUES (%s, %s, %s, %s) RETURNING id, name, avatar, type',
                (name, avatar, chat_type, creator_id)
            )
            chat = cur.fetchone()
            
            all_members = list(set([creator_id] + member_ids))
            for member_id in all_members:
                is_admin = member_id == creator_id
                cur.execute(
                    'INSERT INTO chat_members (chat_id, user_id, is_admin) VALUES (%s, %s, %s)',
                    (chat['id'], member_id, is_admin)
                )
            
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(chat))
            }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
