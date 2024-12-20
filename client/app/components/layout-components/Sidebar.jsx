import React from "react";
import { BrihatLogo } from "../../constants/svg-imports";
import Each from "../../components/common/Each";
import { sidebarData } from "../../constants/sidebar-data";
import Switch from "../common/Switch";
import { cn } from "../../utils/cn";
import { Link } from "react-router";
import usePathname from "../../hooks/usePathname";
import colors from "tailwindcss/colors";
import { ChevronDown } from "lucide-react";

function SidebarTitle({ title }) {
  return <div className="text-gray-500 font-semibold pl-6 mt-2">{title}</div>;
}

function SidebarItem({ title, to, icon, isActive }) {
  const Icon = icon;

  return (
    <div className="flex pl-7 pr-4 my-3 w-full">
      <Link
        className={cn(
          "flex items-center p-2 gap-2 w-full rounded-lg transition-all duration-200",
          isActive ? "bg-white shadow-md" : ""
        )}
        to={to}
      >
        {!!icon ? (
          <div
            className={cn(
              "p-3  rounded-lg shadow-md transition-all duration-200",
              isActive ? "bg-blue-600" : "bg-white"
            )}
          >
            <Icon stroke={isActive ? colors.white : null} />
          </div>
        ) : null}
        <div className="font-medium">{title}</div>
      </Link>
    </div>
  );
}

function Sidebar({ isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname();

  const sidebarWidth = isSidebarOpen
    ? "w-screen md:w-80"
    : "md:w-80 -left-[100%]";

  return (
    <div
      className={cn(
        `fixed z-50 top-0 h-screen flex flex-col justify-between bg-gray-50 border-[1px] border-gray-300 transition-all duration-200 overflow-x-scroll hidden-scrollbar`,
        sidebarWidth
      )}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-center py-10">
          <BrihatLogo />
        </div>
        <Each
          className={"flex items-start flex-col"}
          keyExtractor={(item) => item.id}
          items={sidebarData}
          render={(item) => {
            const props = { ...item, isActive: pathname === item?.to };
            return (
              <Switch
                value={item.type}
                cases={{
                  title: <SidebarTitle {...props} />,
                  item: <SidebarItem {...props} />,
                }}
              />
            );
          }}
        />
      </div>
      {/* Scroll button */}
      <div
        className={cn(
          `fixed z-50 bottom-0 left-0 flex flex-col justify-between transition-all duration-200`,
          sidebarWidth
        )}
      >
        <button className="flex  items-center justify-center gap-2 bg-gray-800 text-white py-0.5">
          <div>Scroll</div>
          <ChevronDown />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
