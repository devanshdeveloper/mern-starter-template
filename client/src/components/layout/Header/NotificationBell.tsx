import React from 'react';
import { Bell } from 'lucide-react';

const NotificationBell = () => {
  return (
    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
      <Bell className="w-6 h-6" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
    </button>
  );
};

export default NotificationBell;