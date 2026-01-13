import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LoginProps {
  onComplete: (userData: any) => void;
  onSwitchToRegistration: () => void;
}

const Login = ({ onComplete, onSwitchToRegistration }: LoginProps) => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState<'phone' | 'code'>('phone');

  const handlePhoneSubmit = () => {
    if (phone.length >= 10) {
      setStep('code');
    }
  };

  const handleCodeSubmit = () => {
    if (code.length === 4) {
      onComplete({
        phone,
        avatar: '😊',
        nickname: 'User',
        username: 'user' + Math.floor(Math.random() * 1000),
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
          <p className="text-muted-foreground">Вход в аккаунт</p>
        </div>

        {step === 'phone' && (
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
              Получить код
            </Button>
            <button
              onClick={onSwitchToRegistration}
              className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Нет аккаунта? Зарегистрироваться
            </button>
          </div>
        )}

        {step === 'code' && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-6">
              <Icon name="Lock" className="mx-auto mb-4 text-primary" size={48} />
              <p className="text-sm text-muted-foreground">
                Код отправлен на номер<br />
                <span className="font-medium text-foreground">{phone}</span>
              </p>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Код подтверждения</label>
              <Input
                type="text"
                placeholder="••••"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="h-12 text-center text-2xl tracking-widest"
                maxLength={4}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep('phone')} variant="outline" className="flex-1 h-12">
                Назад
              </Button>
              <Button onClick={handleCodeSubmit} className="flex-1 h-12" disabled={code.length !== 4}>
                Войти
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Login;
