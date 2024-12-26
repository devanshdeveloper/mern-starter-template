import React from 'react';
import { NavLink } from "react-router";
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  isOpen: boolean;
}

const NavItem = ({ icon: Icon, label, path, isOpen }: NavItemProps) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
          }`
        }
      >
        <Icon className="w-6 h-6" />
        {isOpen && <span className="ml-3">{label}</span>}
      </NavLink>
    </li>
  );
};

export default NavItem;