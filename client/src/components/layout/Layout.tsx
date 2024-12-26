import { Outlet } from "react-router";
import Header from './Header';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Layout = () => {
  const sidebarOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar />
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-[100vw] lg:ml-64 ' : 'ml-0 lg:ml-20'
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;