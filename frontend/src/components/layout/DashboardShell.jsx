import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const pageTitles = {
  "/provider/overview":     "Dashboard",
  "/provider/bookings":     "Bookings",
  "/provider/availability": "Availability",
  "/provider/messages":     "Messages",
  "/provider/reviews":      "Reviews",
  "/provider/settings":     "Settings",
};

const DashboardShell = () => {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || "Dashboard";

  return (
    <div className="flex min-h-screen bg-[#f5f7fa]">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-56">
        <Topbar title={title} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardShell;
