import React from 'react';
import { useDispatch } from 'react-redux';
import { Menu } from 'lucide-react';
import { toggleSidebar } from '../../../store/slices/uiSlice';
import ThemeToggle from './ThemeToggle';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 right-0 left-0 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NotificationBell />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;