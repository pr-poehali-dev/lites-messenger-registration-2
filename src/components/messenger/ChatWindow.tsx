import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Chat, Message } from './MessengerApp';

interface ChatWindowProps {
  chat: Chat;
  messages: Message[];
  onSendMessage: (text: string) => void;
  user: any;
}

const ChatWindow = ({ chat, messages, onSendMessage, user }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-50/30 via-pink-50/30 to-blue-50/30">
      <div className="px-6 py-4 border-b border-border bg-card/80 backdrop-blur flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{chat.avatar}</div>
          <div>
            <h3 className="font-semibold">{chat.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {chat.type === 'group' && <span>Группа · 12 участников</span>}
              {chat.type === 'channel' && <span>Канал · 1.2K подписчиков</span>}
              {chat.type === 'private' && <span>online</span>}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="Phone" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="Video" size={20} />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-full">
            <Icon name="MoreVertical" size={20} />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-md px-4 py-3 rounded-2xl ${
                message.isOwn
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-card border border-border rounded-bl-sm'
              }`}
            >
              {!message.isOwn && chat.type !== 'private' && (
                <p className="text-xs font-semibold mb-1 text-primary">{message.senderName}</p>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border bg-card/80 backdrop-blur">
        <div className="flex items-end gap-3">
          <Button size="icon" variant="ghost" className="rounded-full flex-shrink-0">
            <Icon name="Paperclip" size={20} />
          </Button>
          <div className="flex-1 relative">
            <Input
              placeholder="Написать сообщение..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pr-10 min-h-[44px]"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full"
            >
              <Icon name="Smile" size={20} />
            </Button>
          </div>
          <Button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="rounded-full flex-shrink-0"
            size="icon"
          >
            <Icon name="Send" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
