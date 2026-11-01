
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiGrid,
  FiUser,
  FiPlusSquare,
  FiFolder,
  FiGlobe,
  FiInfo,
  FiSettings,
  FiLogOut,
  FiCode,
} from "react-icons/fi";

const menuItems = [
  { name: "Dashboard", icon: FiGrid, link: "/dashboard" },
  { name: "Profile", icon: FiUser, link: "/dashboard/profile" },
  { name: "Add Project", icon: FiPlusSquare, link: "/dashboard/add-project" },
  { name: "All Projects", icon: FiFolder, link: "/dashboard/all-projects" },
  // { name: "Website", icon: FiGlobe, link: "/dashboard/website" },
  { name: "All APIs", icon: FiCode, link: "/dashboard/all-apis" },
  { name: "About", icon: FiInfo, link: "/dashboard/about" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed left-0 top-0 z-50
        w-64 h-screen
        bg-[#111827] text-white p-5
        flex flex-col
        transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
    >
      {/* Logo */}
      <div className="text-2xl font-bold mb-10">
        <span className="text-blue-500">Admin </span>Panel.
      </div>

      <p className="text-xs text-gray-500 uppercase mb-4">
        Main Menu
      </p>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.link;

          return (
            <Link
              href={item.link}
              key={item.name}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span className="text-sm font-medium">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="mt-auto space-y-3">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white px-4 py-3">
          <FiSettings size={19} />
          Settings
        </button>

        <button className="flex items-center gap-3 text-red-400 px-4 py-3">
          <FiLogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}
