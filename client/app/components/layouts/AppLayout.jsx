import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../layout-components/Sidebar";
import Navbar from "../layout-components/Navbar";
import { cn } from "../../utils/cn";

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const sidebarWidth = isSidebarOpen
  //   ? "w-screen md:w-80"
  //   : "md:w-80 -left-[100%] md:left-0";
  return (
    <div>
      <Sidebar {...{ isSidebarOpen, setIsSidebarOpen }} />
      <div
        className={cn(
          isSidebarOpen
            ? "absolute w-screen lg:w-[calc(100vw-20rem)] left-full lg:left-80"
            : ""
        )}
      >
        <Navbar {...{ isSidebarOpen, setIsSidebarOpen }} />
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
