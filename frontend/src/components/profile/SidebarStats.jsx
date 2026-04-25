import React from "react";
import { CalendarDays, Heart, Clock } from "lucide-react";

const StatItem = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon size={16} strokeWidth={1.8} />
    </div>
    <div>
      <p className="text-base font-extrabold text-slate-800 leading-none">{value ?? "—"}</p>
      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{label}</p>
    </div>
  </div>
);

const SidebarStats = ({ totalBookings, savedProviders, memberSince }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Activity</p>
    <StatItem icon={CalendarDays} label="Total Bookings"   value={totalBookings ?? 0}  color="bg-emerald-50 text-emerald-600" />
    <StatItem icon={Heart}        label="Saved Providers"  value={savedProviders ?? 0} color="bg-rose-50 text-rose-500"       />
    <StatItem icon={Clock}        label="Member Since"     value={memberSince || "—"}  color="bg-blue-50 text-blue-500"       />
  </div>
);

export default SidebarStats;
