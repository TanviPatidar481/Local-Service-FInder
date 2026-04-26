import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Search, CalendarDays, MessageSquare,
  User, Settings, LogOut, Sparkles,
} from "lucide-react";
import { useUserProfile } from "../../features/profile/useUserProfile";

const navItems = [
  { to: "/user/home",     icon: LayoutDashboard, label: "Home" },
  { to: "/user/explore",  icon: Search,          label: "Explore Services" },
  { to: "/user/bookings", icon: CalendarDays,    label: "My Bookings" },
  { to: "/user/messages", icon: MessageSquare,   label: "Messages" },
];

const otherItems = [
  { to: "/user/profile",  icon: User,     label: "Profile" },
  { to: "/user/settings", icon: Settings, label: "Settings" },
];

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
        isActive
          ? "bg-emerald-50 text-emerald-700 font-semibold"
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon size={17} strokeWidth={isActive ? 2.2 : 1.8} />
        {label}
      </>
    )}
  </NavLink>
);

const UserSidebar = () => {
  const { name } = useUserProfile();
  const displayName = name || "User";

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-white border-r border-slate-100 flex flex-col z-30 shadow-sm">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-[18px] border-b border-slate-100">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center shadow-sm">
          <Sparkles size={15} className="text-white" strokeWidth={2.5} />
        </div>
        <span className="text-slate-800 font-bold text-[15px] tracking-tight">LocalBuddy</span>
      </div>

      {/* User Card */}
      <div className="px-4 py-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 rounded-xl border border-transparent">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate leading-tight">{displayName}</p>
            <p className="text-[10px] text-emerald-600 font-semibold truncate">Customer</p>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="px-3 pt-4 pb-2">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Discover</p>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => <NavItem key={item.to} {...item} />)}
        </nav>
      </div>

      {/* Other Nav */}
      <div className="px-3 pt-2 pb-2 flex-1">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Account</p>
        <nav className="flex flex-col gap-0.5">
          {otherItems.map((item) => <NavItem key={item.to} {...item} />)}
        </nav>
      </div>

      {/* Sign Out */}
      <div className="px-4 pb-4">
        <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
          <LogOut size={16} strokeWidth={1.8} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>

    </aside>
  );
};

export default UserSidebar;
