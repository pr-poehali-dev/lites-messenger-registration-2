import { useState } from 'react';
import Registration from '@/components/messenger/Registration';
import Login from '@/components/messenger/Login';
import MessengerApp from '@/components/messenger/MessengerApp';

interface User {
  phone: string;
  avatar: string;
  nickname: string;
  username: string;
  isPremium: boolean;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'registration' | 'login' | 'messenger'>('registration');
  const [user, setUser] = useState<User | null>(null);

  const handleRegistrationComplete = (userData: User) => {
    setUser(userData);
    setCurrentView('messenger');
  };

  const handleLoginComplete = (userData: User) => {
    setUser(userData);
    setCurrentView('messenger');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  if (currentView === 'registration') {
    return (
      <Registration
        onComplete={handleRegistrationComplete}
        onSwitchToLogin={() => setCurrentView('login')}
      />
    );
  }

  if (currentView === 'login') {
    return (
      <Login
        onComplete={handleLoginComplete}
        onSwitchToRegistration={() => setCurrentView('registration')}
      />
    );
  }

  return user ? <MessengerApp user={user} onLogout={handleLogout} /> : null;
};

export default Index;