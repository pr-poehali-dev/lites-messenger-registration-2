import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Contact {
  id: string;
  name: string;
  username: string;
  avatar: string;
  status: string;
}

const Contacts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'Алиса', username: 'alice', avatar: '👩', status: 'online' },
    { id: '2', name: 'Боб', username: 'bob', avatar: '👨', status: 'был(а) недавно' },
    { id: '3', name: 'Катя', username: 'kate', avatar: '👧', status: 'online' },
    { id: '4', name: 'Дима', username: 'dima', avatar: '🧑', status: 'был(а) 2 часа назад' },
    { id: '5', name: 'Елена', username: 'elena', avatar: '👩‍💼', status: 'online' },
  ]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Контакты</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Icon name="UserPlus" className="mr-2" size={20} />
                Добавить контакт
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить контакт</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Номер телефона или username</label>
                  <Input placeholder="+7 или @username" />
                </div>
                <Button className="w-full">
                  <Icon name="Search" className="mr-2" size={20} />
                  Найти
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Поиск контактов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="grid gap-3">
          {filteredContacts.map((contact) => (
            <Card key={contact.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{contact.avatar}</div>
                  <div>
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-muted-foreground">@{contact.username}</p>
                    <p className="text-xs text-muted-foreground mt-1">{contact.status}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <Icon name="MessageSquare" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full">
                    <Icon name="Phone" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost" className="rounded-full text-destructive">
                    <Icon name="UserMinus" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
