import React from 'react';
import { Home, Gift, Palette, LineChart, Settings } from 'lucide-react';

const AppLayout = ({ children }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Gift size={20} />, label: 'Program Builder', path: '/builder' },
    { icon: <Palette size={20} />, label: 'Templates', path: '/templates' },
    { icon: <LineChart size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-800">Loyalty Builder</h1>
          </div>
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;