import { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import Contacts from './Contacts';
import Profile from './Profile';
import Archive from './Archive';
import Search from './Search';
import Settings from './Settings';
import Sidebar from './Sidebar';

interface MessengerAppProps {
  user: {
    phone: string;
    avatar: string;
    nickname: string;
    username: string;
    isPremium: boolean;
  };
  onLogout: () => void;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  type: 'private' | 'group' | 'channel';
  isPinned?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const MessengerApp = ({ user, onLogout }: MessengerAppProps) => {
  const [activeSection, setActiveSection] = useState<'chats' | 'contacts' | 'profile' | 'archive' | 'search' | 'settings'>('chats');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Алиса',
      avatar: '👩',
      lastMessage: 'Привет! Как дела?',
      timestamp: '14:23',
      unread: 2,
      type: 'private',
      isPinned: true
    },
    {
      id: '2',
      name: 'Рабочая группа',
      avatar: '💼',
      lastMessage: 'Встреча перенесена на завтра',
      timestamp: '13:45',
      unread: 5,
      type: 'group'
    },
    {
      id: '3',
      name: 'Новости Lites',
      avatar: '📢',
      lastMessage: 'Обновление версии 2.0',
      timestamp: 'Вчера',
      unread: 0,
      type: 'channel'
    }
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'Алиса',
      text: 'Привет! Как дела?',
      timestamp: '14:23',
      isOwn: false
    }
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.username,
      senderName: user.nickname,
      text,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, newMessage]);

    if (selectedChat) {
      setChats(chats.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, lastMessage: text, timestamp: newMessage.timestamp }
          : chat
      ));
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'chats':
        return (
          <div className="flex h-full">
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
              user={user}
            />
            {selectedChat ? (
              <ChatWindow
                chat={selectedChat}
                messages={messages}
                onSendMessage={handleSendMessage}
                user={user}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-secondary/20">
                <div className="text-center">
                  <div className="text-6xl mb-4">💬</div>
                  <p className="text-muted-foreground">Выберите чат для начала общения</p>
                </div>
              </div>
            )}
          </div>
        );
      case 'contacts':
        return <Contacts />;
      case 'profile':
        return <Profile user={user} onLogout={onLogout} />;
      case 'archive':
        return <Archive />;
      case 'search':
        return <Search />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex bg-background overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default MessengerApp;
