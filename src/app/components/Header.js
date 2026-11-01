
"use client";

import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/dashboard/profile": "Profile",
  "/dashboard/add-project": "Add Project",
  "/dashboard/all-projects": "All Projects",
  "/dashboard/website": "Website",
  "/dashboard/about": "About",
};

export default function Header({ onMenuClick }) {
  const pathname = usePathname();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <header className="bg-white border-b border-gray-200 px-5 md:px-8 h-[76px] flex items-center justify-between sticky top-0 z-30">

      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-xl text-black pr-2 cursor-pointer"
        >
          <FiMenu />
        </button>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {/* {title} */} Dashboard
          </h2>
          <p className="text-xs text-gray-400">
            Welcome back, Admin!
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-3 py-2">
          <FiSearch className="text-gray-400" />
          <input
            placeholder="Search..."
            className="bg-transparent outline-none px-2 text-sm w-32"
          />
        </div>

        <button className="text-gray-500 text-xl">
          <FiBell />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Admin</p>
            {/* <p className="text-xs text-gray-400">Administrator</p> */}
          </div>
        </div>
      </div>
    </header>
  );
}
