import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';

interface ProfileProps {
  user: {
    avatar: string;
    nickname: string;
    username: string;
    phone: string;
    isPremium: boolean;
  };
  onLogout: () => void;
}

const Profile = ({ user, onLogout }: ProfileProps) => {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8 text-center border-0 shadow-xl">
          <div className="text-8xl mb-4">{user.avatar}</div>
          <h2 className="text-2xl font-bold mb-1">{user.nickname}</h2>
          <p className="text-muted-foreground mb-4">@{user.username}</p>
          <p className="text-sm text-muted-foreground mb-6">{user.phone}</p>

          {user.isPremium ? (
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 text-lg">
              <Icon name="Crown" className="mr-2" size={18} />
              Premium
            </Badge>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Icon name="Sparkles" className="mr-2" size={18} />
                  Оформить Premium
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    <Icon name="Crown" className="text-amber-500" size={28} />
                    Lites Premium
                  </DialogTitle>
                  <DialogDescription>
                    Получите больше возможностей
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="font-medium">Без рекламы</p>
                        <p className="text-sm text-muted-foreground">Никаких отвлекающих объявлений</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="font-medium">Увеличенные лимиты</p>
                        <p className="text-sm text-muted-foreground">Файлы до 4 ГБ, больше участников в группах</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="font-medium">Эксклюзивные стикеры</p>
                        <p className="text-sm text-muted-foreground">Коллекция премиум-стикеров</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" className="text-primary flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="font-medium">Значок Premium</p>
                        <p className="text-sm text-muted-foreground">Выделяйтесь среди других пользователей</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-baseline justify-center gap-2 mb-4">
                      <span className="text-4xl font-bold">350₽</span>
                      <span className="text-muted-foreground">/месяц</span>
                    </div>
                    <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Icon name="CreditCard" className="mr-2" size={20} />
                      Оплатить
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Доступна оплата по СБП и картой
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </Card>

        <Card className="p-6 border-0 shadow-xl space-y-3">
          <h3 className="font-semibold mb-4">Статистика</h3>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Icon name="MessageSquare" className="text-primary" size={20} />
              <span>Чаты</span>
            </div>
            <span className="font-semibold">24</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Icon name="Users" className="text-primary" size={20} />
              <span>Контакты</span>
            </div>
            <span className="font-semibold">156</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Icon name="Radio" className="text-primary" size={20} />
              <span>Каналы</span>
            </div>
            <span className="font-semibold">8</span>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl space-y-3">
          <h3 className="font-semibold mb-4">Действия</h3>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Edit" className="mr-3" size={20} />
            Редактировать профиль
          </Button>
          <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={onLogout}>
            <Icon name="LogOut" className="mr-3" size={20} />
            Выйти из аккаунта
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
