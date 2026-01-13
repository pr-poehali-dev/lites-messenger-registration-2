import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Search = () => {
  const [query, setQuery] = useState('');

  const searchResults = {
    messages: [
      { id: '1', chatName: 'Алиса', text: 'Привет! Как дела?', avatar: '👩', date: 'Сегодня' },
      { id: '2', chatName: 'Рабочая группа', text: 'Встреча в 15:00', avatar: '💼', date: 'Вчера' },
    ],
    chats: [
      { id: '1', name: 'Алиса', avatar: '👩', type: 'private' },
      { id: '2', name: 'Рабочая группа', avatar: '💼', type: 'group' },
    ],
    contacts: [
      { id: '1', name: 'Алиса', username: 'alice', avatar: '👩' },
    ],
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Search" size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">Поиск</h2>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Искать сообщения, чаты, контакты..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 h-14 text-lg border-0 shadow-lg"
            />
          </div>
        </div>

        {query ? (
          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="messages">Сообщения</TabsTrigger>
              <TabsTrigger value="chats">Чаты</TabsTrigger>
              <TabsTrigger value="contacts">Контакты</TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="space-y-3">
              {searchResults.messages.map((result) => (
                <Card key={result.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{result.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{result.chatName}</h3>
                        <span className="text-xs text-muted-foreground">{result.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{result.text}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="chats" className="space-y-3">
              {searchResults.chats.map((result) => (
                <Card key={result.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{result.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.type === 'group' ? 'Группа' : 'Личный чат'}
                      </p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="contacts" className="space-y-3">
              {searchResults.contacts.map((result) => (
                <Card key={result.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{result.avatar}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{result.name}</h3>
                      <p className="text-sm text-muted-foreground">@{result.username}</p>
                    </div>
                    <Icon name="MessageSquare" size={20} className="text-primary" />
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-muted-foreground">Введите запрос для поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
