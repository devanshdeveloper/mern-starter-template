import { useDispatch } from 'react-redux';
import { LogOut } from 'lucide-react';
import { logout } from '../../../store/slices/authSlice';

interface LogoutButtonProps {
  isOpen: boolean;
}

const LogoutButton = ({ isOpen }: LogoutButtonProps) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(logout())}
      className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <LogOut className="w-6 h-6" />
      {isOpen && <span className="ml-3">Logout</span>}
    </button>
  );
};

export default LogoutButton;