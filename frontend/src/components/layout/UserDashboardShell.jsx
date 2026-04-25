import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "./UserSidebar";
import UserTopbar from "./UserTopbar";

const UserDashboardShell = () => (
  <div className="flex min-h-screen bg-[#f5f7fa]">
    <UserSidebar />
    <div className="flex-1 flex flex-col ml-56">
      <UserTopbar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  </div>
);

export default UserDashboardShell;
