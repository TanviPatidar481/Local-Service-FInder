import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, CalendarDays, Clock3, MessageSquare,
  Star, Settings, LogOut, Sparkles, ChevronDown, ExternalLink,
} from "lucide-react";
import { useProviderProfile } from "../../features/profile/useProviderProfile";

const navItems = [
  { to: "/provider/overview",     icon: LayoutDashboard, label: "Dashboard" },
  { to: "/provider/bookings",     icon: CalendarDays,    label: "Bookings" },
  { to: "/provider/messages",     icon: MessageSquare,   label: "Messages" },
];

const otherItems = [
  { to: "/provider/availability", icon: Clock3,    label: "Availability" },
  { to: "/provider/reviews",      icon: Star,      label: "Reviews" },
  { to: "/provider/settings",     icon: Settings,  label: "Settings" },
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

const Sidebar = () => {
  const { contactPerson, businessName } = useProviderProfile();
  const displayName = contactPerson || businessName || "Provider";
  const providerId  = localStorage.getItem("providerId") || "me";

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
        <NavLink to={`/provider/${providerId}`}>
          <div className="flex items-center gap-2.5 px-3 py-2.5 bg-slate-50 rounded-xl cursor-pointer hover:bg-emerald-50 hover:border-emerald-200 border border-transparent transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate leading-tight">{displayName}</p>
              <p className="text-[10px] text-emerald-600 font-semibold truncate">View my profile →</p>
            </div>
            <ExternalLink size={12} className="text-slate-400 flex-shrink-0" strokeWidth={2} />
          </div>
        </NavLink>
      </div>

      {/* Main Nav */}
      <div className="px-3 pt-4 pb-2">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Operations</p>
        <nav className="flex flex-col gap-0.5">
          {navItems.map((item) => <NavItem key={item.to} {...item} />)}
        </nav>
      </div>

      {/* Other Nav */}
      <div className="px-3 pt-2 pb-2 flex-1">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Manage</p>
        <nav className="flex flex-col gap-0.5">
          {otherItems.map((item) => <NavItem key={item.to} {...item} />)}
        </nav>
      </div>

      {/* CTA Card */}
      <div className="px-4 py-3 border-t border-slate-100">
        <NavLink to={`/provider/${providerId}`}>
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl p-4 text-white hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-xs font-bold leading-tight mb-1">Your Public Profile</p>
            <p className="text-[10px] text-white/75 mb-3 leading-relaxed">
              Edit services, posts, and profile info visible to customers.
            </p>
            <div className="w-full bg-white text-emerald-700 text-[11px] font-bold py-2 rounded-xl text-center hover:bg-emerald-50 transition-colors flex items-center justify-center gap-1.5">
              <ExternalLink size={11} strokeWidth={2.5} /> Open Profile
            </div>
          </div>
        </NavLink>
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

export default Sidebar;
