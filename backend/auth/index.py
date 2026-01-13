import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: dict, context) -> dict:
    """API для регистрации и входа пользователей в Lites мессенджер"""
    
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
    
    if method == 'POST':
        body = json.loads(event.get('body', '{}'))
        action = body.get('action')
        
        if action == 'register':
            phone = body.get('phone')
            avatar = body.get('avatar')
            nickname = body.get('nickname')
            username = body.get('username')
            
            cur.execute(
                'SELECT id FROM users WHERE phone = %s OR username = %s',
                (phone, username)
            )
            existing = cur.fetchone()
            
            if existing:
                cur.close()
                conn.close()
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь уже существует'})
                }
            
            cur.execute(
                'INSERT INTO users (phone, avatar, nickname, username) VALUES (%s, %s, %s, %s) RETURNING id, phone, avatar, nickname, username, is_premium',
                (phone, avatar, nickname, username)
            )
            user = cur.fetchone()
            conn.commit()
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(user))
            }
        
        elif action == 'login':
            phone = body.get('phone')
            
            cur.execute(
                'SELECT id, phone, avatar, nickname, username, is_premium FROM users WHERE phone = %s',
                (phone,)
            )
            user = cur.fetchone()
            
            if user:
                cur.execute(
                    'UPDATE users SET last_active = CURRENT_TIMESTAMP WHERE id = %s',
                    (user['id'],)
                )
                conn.commit()
            
            cur.close()
            conn.close()
            
            if user:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(user))
                }
            else:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Пользователь не найден'})
                }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
