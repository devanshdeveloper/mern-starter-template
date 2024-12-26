import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { RootState } from '../../../store';
import { toggleTheme } from '../../../store/slices/uiSlice';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6" />
      ) : (
        <Sun className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;