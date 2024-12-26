import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const UserMenu = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
            {user?.name?.charAt(0)}
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <p className="text-sm font-medium">{user?.name}</p>
        <p className="text-xs text-gray-500">{user?.role}</p>
      </div>
    </div>
  );
};

export default UserMenu;