import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  BarChart,
  Package,
} from "lucide-react";
import { RootState } from "../../../store";
import NavItem from "./NavItem";
import LogoutButton from "./LogoutButton";

const Sidebar = () => {
  const isOpen = useSelector((state: RootState) => state.ui.sidebarOpen);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: ShoppingBag, label: "Orders", path: "/orders" },
    { icon: Package, label: "Products", path: "/products" },
    { icon: Users, label: "Customers", path: "/customers" },
    { icon: BarChart, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside
      className={`bg-white dark:bg-gray-800 h-screen fixed  top-0 transition-all duration-300 ${
        isOpen ? "w-screen lg:w-64" : "-left-[100vw] lg:left-0 lg:w-20"
      } border-r border-gray-200 dark:border-gray-700`}
    >
      <div className="flex flex-col h-full mt-16">

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                isOpen={isOpen}
              />
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <LogoutButton isOpen={isOpen} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
