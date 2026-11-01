
"use client";

import { useState } from "react";

import { Button } from "@heroui/react";

import {
  FiPlus,
  FiActivity,
  FiArrowUpRight,
  FiFolder,
  FiGlobe,
  FiInfo,
} from "react-icons/fi";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Default selected menu
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  // Menu select function
  const handleMenuSelect = (menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
  };

  // Dynamic page content
  const renderContent = () => {
    switch (activeMenu) {

      case "Dashboard":
        return (
          <div className="space-y-7">

            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome to Dashboard 👋
                </h1>

                <p className="text-gray-500 text-sm mt-2">
                  Here is what's happening with your portfolio.
                </p>
              </div>

              <Button
                color="primary"
              >
                <FiPlus />
                Add New Project
              </Button>

            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

              <StatCard
                title="Total Projects"
                value="24"
                type="projects"
                change="+4 this month"
              />

              <StatCard
                title="Total Visitors"
                value="12.5K"
                type="views"
                change="+12% this month"
              />

              <StatCard
                title="Published Projects"
                value="18"
                type="published"
                change="Active projects"
              />

              <StatCard
                title="Pending Projects"
                value="06"
                type="pending"
                change="Need attention"
              />

            </div>

            {/* Activity Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

              <div className="xl:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

                <div className="flex justify-between items-center">

                  <div>
                    <h2 className="font-bold text-lg">
                      Portfolio Overview
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      Your portfolio activity
                    </p>
                  </div>

                  <FiActivity className="text-blue-600 text-2xl" />

                </div>

                {/* Chart */}
                <div className="mt-8 grid grid-cols-7 gap-3 items-end h-40">

                  {[45, 70, 55, 85, 60, 95, 75].map((height, i) => (

                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 h-full justify-end"
                    >

                      <div
                        className="w-full max-w-12 bg-blue-500 rounded-t-lg hover:bg-blue-700 transition"
                        style={{ height: `${height}%` }}
                      />

                      <span className="text-xs text-gray-400">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* Portfolio Status */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">

                <h2 className="font-bold text-xl">
                  Portfolio Status
                </h2>

                <p className="text-blue-100 text-sm mt-2">
                  Your website is looking good!
                </p>

                <div className="mt-8">

                  <p className="text-blue-100 text-sm">
                    Website Status
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    Online
                  </h2>

                  <div className="flex items-center gap-2 mt-2 text-sm text-blue-100">

                    <span className="w-2 h-2 rounded-full bg-green-400" />

                    Website is active

                  </div>

                </div>

                <button
                  onClick={() => handleMenuSelect("Website")}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Visit Website <FiArrowUpRight />
                </button>

              </div>

            </div>

          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar
          activeMenu={activeMenu}
          onSelect={handleMenuSelect}
        />
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative w-64 h-screen overflow-y-auto">
            <Sidebar
              activeMenu={activeMenu}
              onSelect={handleMenuSelect}
            />
          </div>

        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        <div className="p-5 md:p-8">
          {renderContent()}
        </div>

      </main>

    </div>
  );
}
