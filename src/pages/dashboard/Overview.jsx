import React from "react";
import { CalendarDays, Clock, CheckCircle2, Star, Clock3, ArrowRight, Zap, ExternalLink } from "lucide-react";
import { NavLink } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import ProfileCard from "../../components/dashboard/ProfileCard";
import { useProviderProfile } from "../../features/profile/useProviderProfile";

// TODO: replace with API calls when backend endpoints are ready
// GET /provider/stats           → { totalBookings, pending, completed, avgRating }
// GET /provider/bookings?limit=3 → []

const EmptyBookings = () => (
  <div className="flex flex-col items-center justify-center py-14 text-slate-400">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
      <CalendarDays size={24} className="text-slate-300" strokeWidth={1.5} />
    </div>
    <p className="text-sm font-semibold text-slate-500">No bookings yet</p>
    <p className="text-xs mt-1 text-slate-400">Once customers book your services, they'll appear here.</p>
  </div>
);

const Overview = () => {
  const { contactPerson } = useProviderProfile();
  const providerId = localStorage.getItem("providerId") || "me";
  const firstName  = contactPerson?.split(" ")[0] || "there";

  const stats = [
    { icon: CalendarDays, label: "Total Bookings", value: "0", sub: "No bookings yet",  color: "green"  },
    { icon: Clock,        label: "Pending",         value: "0", sub: "Nothing pending", color: "orange" },
    { icon: CheckCircle2, label: "Completed",       value: "0", sub: "This month",      color: "teal"   },
    { icon: Star,         label: "Avg Rating",      value: "—", sub: "No reviews yet",  color: "amber"  },
  ];

  const quickActions = [
    { to: `/provider/${providerId}`, icon: ExternalLink, label: "My Profile",       sub: "Edit services & posts",  bg: "bg-emerald-50 hover:bg-emerald-100", iconColor: "text-emerald-600", border: "border-emerald-100" },
    { to: "/provider/availability",  icon: Clock3,       label: "Set Availability", sub: "Update your schedule",   bg: "bg-blue-50 hover:bg-blue-100",     iconColor: "text-blue-600",    border: "border-blue-100"    },
    { to: "/provider/bookings",      icon: CalendarDays, label: "View Bookings",    sub: "Manage appointments",    bg: "bg-violet-50 hover:bg-violet-100", iconColor: "text-violet-600",  border: "border-violet-100"  },
    { to: "/provider/reviews",       icon: Star,         label: "Reviews",          sub: "See customer feedback",  bg: "bg-amber-50 hover:bg-amber-100",   iconColor: "text-amber-500",   border: "border-amber-100"   },
  ];

  return (
    <div className="space-y-6 provider-dash">

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 overflow-hidden">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-emerald-200/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-16 bottom-0 w-32 h-32 bg-green-300/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-20 h-20 bg-white/70 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-sm border border-emerald-100">
          <Zap size={36} className="text-emerald-500" strokeWidth={1.5} />
        </div>
        <div className="relative z-10 max-w-md">
          <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">Welcome back, {firstName}</p>
          <h1 className="text-2xl font-extrabold text-slate-800 leading-snug tracking-tight">
            Manage Your <span className="text-emerald-600">Business</span><br />All in One Place
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-4 leading-relaxed">
            Track bookings, manage services, and connect with customers effortlessly.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} /> Verified</span>
            <span className="flex items-center gap-1.5"><Star size={13} className="text-amber-400" strokeWidth={2.5} /> Top Rated</span>
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-blue-500" strokeWidth={2.5} /> Fast Response</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Profile Card + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ProfileCard />
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</p>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map(({ to, icon: Icon, label, sub, bg, iconColor, border }) => (
              <NavLink key={to} to={to}>
                <button className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${bg} ${border}`}>
                  <div className={`w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0 ${iconColor}`}>
                    <Icon size={17} strokeWidth={2} />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${iconColor}`}>{label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>
                  </div>
                </button>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Recent Booking Requests</h2>
            <p className="text-xs text-slate-400 mt-0.5">Latest activity from your customers</p>
          </div>
          <NavLink to="/provider/bookings"
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View all <ArrowRight size={13} strokeWidth={2.5} />
          </NavLink>
        </div>
        <EmptyBookings />
      </div>

    </div>
  );
};

export default Overview;
