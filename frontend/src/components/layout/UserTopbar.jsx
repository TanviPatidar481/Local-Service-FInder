import React, { useState } from "react";
import { MapPin, Search, Bell, ChevronDown } from "lucide-react";
import { useUserProfile } from "../../features/profile/useUserProfile";

const UserTopbar = () => {
  const { name, city } = useUserProfile();
  const displayName = name || "User";
  const displayCity = city || "Your City";
  const [search, setSearch] = useState("");

  return (
    <header className="h-[60px] bg-white border-b border-slate-100 flex items-center justify-between px-6 sticky top-0 z-20 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">

      <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 cursor-pointer hover:border-emerald-300 transition-colors">
        <MapPin size={14} className="text-emerald-500" strokeWidth={2.5} />
        <span className="text-sm font-semibold text-slate-700">{displayCity}</span>
        <ChevronDown size={13} className="text-slate-400" />
      </div>

      <div className="flex-1 max-w-sm mx-6">
        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 focus-within:border-emerald-400 focus-within:bg-white transition-all">
          <Search size={14} className="text-slate-400 flex-shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services, providers..."
            className="flex-1 bg-transparent text-sm outline-none text-slate-600 placeholder-slate-400 font-medium"
          />
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={18} strokeWidth={1.8} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-semibold text-slate-700 hidden md:block">{displayName}</span>
          <ChevronDown size={13} className="text-slate-400 hidden md:block" />
        </div>
      </div>

    </header>
  );
};

export default UserTopbar;
