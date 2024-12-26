import { useSelector, useDispatch } from "react-redux";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { RootState } from "../../store";
import { toggleSidebar, toggleTheme } from "../../store/slices/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed top-0 right-0 left-0 z-30">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="text-xl font-semibold">Ecommerce Dashboard</div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(toggleTheme())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {theme === "light" ? (
              <Moon className="w-6 h-6" />
            ) : (
              <Sun className="w-6 h-6" />
            )}
          </button>

          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

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
        </div>
      </div>
    </header>
  );
};

export default Header;
