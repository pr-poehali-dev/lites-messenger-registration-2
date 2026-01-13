import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Chat } from './MessengerApp';

interface ChatListProps {
  chats: Chat[];
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  user: any;
}

const ChatList = ({ chats, selectedChat, onSelectChat, user }: ChatListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newChatType, setNewChatType] = useState<'private' | 'group' | 'channel'>('private');

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-96 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Чаты</h2>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Icon name="Plus" size={20} />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start h-16"
                  onClick={() => setNewChatType('private')}
                >
                  <Icon name="User" className="mr-3" size={24} />
                  <div className="text-left">
                    <div className="font-medium">Личный чат</div>
                    <div className="text-sm text-muted-foreground">Общение один на один</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-16"
                  onClick={() => setNewChatType('group')}
                >
                  <Icon name="Users" className="mr-3" size={24} />
                  <div className="text-left">
                    <div className="font-medium">Группа</div>
                    <div className="text-sm text-muted-foreground">До 200 участников</div>
                  </div>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start h-16"
                  onClick={() => setNewChatType('channel')}
                >
                  <Icon name="Radio" className="mr-3" size={24} />
                  <div className="text-left">
                    <div className="font-medium">Канал</div>
                    <div className="text-sm text-muted-foreground">Неограниченная аудитория</div>
                  </div>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input
            placeholder="Поиск чатов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full p-4 flex items-start gap-3 border-b border-border transition-colors hover:bg-secondary/50 ${
              selectedChat?.id === chat.id ? 'bg-secondary' : ''
            }`}
          >
            <div className="text-3xl flex-shrink-0">{chat.avatar}</div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold truncate">{chat.name}</span>
                  {chat.type === 'group' && <Icon name="Users" size={14} className="text-muted-foreground" />}
                  {chat.type === 'channel' && <Icon name="Radio" size={14} className="text-muted-foreground" />}
                  {chat.isPinned && <Icon name="Pin" size={14} className="text-primary" />}
                </div>
                <span className="text-xs text-muted-foreground">{chat.timestamp}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <Badge className="ml-2 bg-primary text-primary-foreground">{chat.unread}</Badge>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
