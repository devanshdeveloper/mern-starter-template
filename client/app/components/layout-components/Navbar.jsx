import { ChevronDown } from "lucide-react";
import {
  NotificationIcon,
  SettingsIcon,
  SidebarLeft,
  UserSquareIcon,
} from "../../constants/svg-imports";
import ProgressBar from "../ui/ProgressBar";
import { useAuthContext } from "../providers/AuthProvider";

function Navbar({ isSidebarOpen, setIsSidebarOpen }) {
  const { user } = useAuthContext();

  return (
    <div className="bg-gray-100 w-full h-24 flex justify-between pb-4 px-10 border-b-[1px] border-gray-300">
      <div className="flex items-end gap-10">
        <div onClick={() => setIsSidebarOpen((prev) => !prev)}>
          <SidebarLeft />
        </div>
        <div className="flex gap-1">
          <div className="font-semibold">2024-25</div>
          <ChevronDown strokeWidth={"1px"} />
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="text-green-500">12 days left in free trial</div>
        <div className="flex flex-col gap-1 items-center">
          <div className="text-blue-600 font-semibold">
            50% Profile Complete
          </div>
          <ProgressBar percent={50} className={"w-[200px]"} />
        </div>
        <IconButtton icon={SettingsIcon} />
        <IconButtton icon={NotificationIcon} />
        <div className="flex gap-2 items-end">
          <IconButtton icon={UserSquareIcon} />
          <div className="flex flex-col">
            <div className="text-sx lg:text-sm">Admin</div>
            <div className="font-semibold">Sidhant</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconButtton({ icon }) {
  const Icon = icon;

  return (
    <div className="border-[1px] p-2 border-gray-300 bg-white rounded-md">
      <Icon />
    </div>
  );
}

export default Navbar;
