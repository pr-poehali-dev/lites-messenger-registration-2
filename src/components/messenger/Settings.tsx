import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Settings = () => {
  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50/50 via-pink-50/50 to-blue-50/50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <Icon name="Settings" size={32} className="text-primary" />
          <h2 className="text-3xl font-bold">Настройки</h2>
        </div>

        <Card className="p-6 border-0 shadow-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Bell" size={20} />
            Уведомления
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push-уведомления</p>
                <p className="text-sm text-muted-foreground">О новых сообщениях</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Активность контактов</p>
                <p className="text-sm text-muted-foreground">Когда друзья в сети</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Звук уведомлений</p>
                <p className="text-sm text-muted-foreground">Звуковые сигналы</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Lock" size={20} />
            Приватность
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Последняя активность</p>
                <p className="text-sm text-muted-foreground">Показывать время захода</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Статус "печатает"</p>
                <p className="text-sm text-muted-foreground">Показывать когда вы пишете</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Чтение сообщений</p>
                <p className="text-sm text-muted-foreground">Отправлять отчеты о прочтении</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Palette" size={20} />
            Внешний вид
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Тёмная тема</p>
                <p className="text-sm text-muted-foreground">Переключить на тёмный режим</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Image" className="mr-3" size={20} />
              Изменить фон чатов
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Database" size={20} />
            Данные и хранилище
          </h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Icon name="Download" className="mr-3" size={20} />
              Автозагрузка медиа
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Icon name="HardDrive" className="mr-3" size={20} />
              Управление хранилищем
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              <Icon name="Trash2" className="mr-3" size={20} />
              Очистить кэш
            </Button>
          </div>
        </Card>

        <Card className="p-6 border-0 shadow-xl">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Icon name="Info" size={20} />
            О приложении
          </h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Версия: 2.0.1</p>
            <p>© 2026 Lites Messenger</p>
            <div className="flex gap-3 mt-4">
              <Button variant="outline" size="sm">Условия использования</Button>
              <Button variant="outline" size="sm">Политика конфиденциальности</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
