import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RegistrationProps {
  onComplete: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const emojiAvatars = ['😊', '🚀', '🎨', '🌟', '🎭', '🎯', '🎪', '🎨', '🦄', '🐱', '🐶', '🐼', '🦊', '🐻', '🦁', '🐯'];

const Registration = ({ onComplete, onSwitchToLogin }: RegistrationProps) => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [avatarType, setAvatarType] = useState<'emoji' | 'photo'>('emoji');
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setStep(2);
    }
  };

  const handleAvatarSubmit = () => {
    setStep(3);
  };

  const handleFinalSubmit = () => {
    if (nickname && username) {
      onComplete({
        phone,
        avatar: avatarType === 'emoji' ? selectedEmoji : '📷',
        nickname,
        username,
        isPremium: false
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl border-0 bg-white/80 backdrop-blur">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Lites
          </h1>
          <p className="text-muted-foreground">Регистрация</p>
        </div>

        <div className="flex justify-center mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-12 mx-1 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-sm font-medium mb-2 block">Номер телефона</label>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 text-lg"
              />
            </div>
            <Button onClick={handlePhoneSubmit} className="w-full h-12 text-lg" disabled={phone.length < 10}>
              Продолжить
            </Button>
            <button
              onClick={onSwitchToLogin}
              className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Уже есть аккаунт? Войти
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center">
              <p className="text-sm font-medium mb-4">Выберите аватар</p>
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  variant={avatarType === 'emoji' ? 'default' : 'outline'}
                  onClick={() => setAvatarType('emoji')}
                  className="flex-1"
                >
                  <Icon name="Smile" className="mr-2" size={20} />
                  Emoji
                </Button>
                <Button
                  variant={avatarType === 'photo' ? 'default' : 'outline'}
                  onClick={() => setAvatarType('photo')}
                  className="flex-1"
                >
                  <Icon name="Image" className="mr-2" size={20} />
                  Фото
                </Button>
              </div>

              {avatarType === 'emoji' && (
                <div className="grid grid-cols-4 gap-3 mb-6">
                  {emojiAvatars.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`text-4xl p-4 rounded-2xl transition-all hover:scale-110 ${
                        selectedEmoji === emoji ? 'bg-primary/20 ring-2 ring-primary' : 'bg-gray-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}

              {avatarType === 'photo' && (
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 mb-6 hover:border-primary transition-colors cursor-pointer">
                  <Icon name="Upload" className="mx-auto mb-2" size={48} />
                  <p className="text-sm text-muted-foreground">Выберите фото из галереи</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(1)} variant="outline" className="flex-1 h-12">
                Назад
              </Button>
              <Button onClick={handleAvatarSubmit} className="flex-1 h-12">
                Продолжить
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="text-6xl bg-primary/10 p-6 rounded-full">{selectedEmoji}</div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Никнейм</label>
              <Input
                type="text"
                placeholder="Введите ваше имя"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="h-12"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Username</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">@</span>
                <Input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-12 pl-8"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep(2)} variant="outline" className="flex-1 h-12">
                Назад
              </Button>
              <Button
                onClick={handleFinalSubmit}
                className="flex-1 h-12"
                disabled={!nickname || !username}
              >
                Готово
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Registration;
