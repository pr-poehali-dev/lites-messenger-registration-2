import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: 'chats' | 'contacts' | 'profile' | 'archive' | 'search' | 'settings') => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const menuItems = [
    { id: 'chats', icon: 'MessageSquare', label: 'Чаты' },
    { id: 'contacts', icon: 'Users', label: 'Контакты' },
    { id: 'search', icon: 'Search', label: 'Поиск' },
    { id: 'archive', icon: 'Archive', label: 'Архив' },
    { id: 'settings', icon: 'Settings', label: 'Настройки' },
    { id: 'profile', icon: 'User', label: 'Профиль' },
  ];

  return (
    <div className="w-20 bg-card border-r border-border flex flex-col items-center py-6 gap-4">
      <div className="mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
          L
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id as any)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative group ${
              activeSection === item.id
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            <Icon name={item.icon as any} size={22} />
            <span className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
