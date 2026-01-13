import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Archive = () => {
  const archivedChats = [
    { id: '1', name: 'Старая группа', avatar: '📦', lastMessage: 'Последнее сообщение', date: '12.12.2025' },
    { id: '2', name: 'Проект 2024', avatar: '🗂️', lastMessage: 'Проект завершен', date: '15.11.2025' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Archive" size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">Архив</h2>
        </div>

        {archivedChats.length > 0 ? (
          <div className="grid gap-3">
            {archivedChats.map((chat) => (
              <Card key={chat.id} className="p-4 border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{chat.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{chat.name}</h3>
                    <p className="text-sm text-muted-foreground">{chat.lastMessage}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground mb-2">{chat.date}</p>
                    <Icon name="ArchiveRestore" size={20} className="text-primary" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-muted-foreground">Архив пуст</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
