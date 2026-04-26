import React, { useState } from "react";
import { CalendarDays, MessageSquare, Search, Zap, ArrowRight, CheckCircle2, AlertCircle, BookOpen, Sparkles, Wrench, Dumbbell, PartyPopper, ShieldCheck, Trophy, Lightbulb } from "lucide-react";
import { NavLink } from "react-router-dom";
import StatCard from "../../components/dashboard/StatCard";
import ProviderCard from "../../components/common/ProviderCard";
import { ProviderCardSkeleton } from "../../components/common/SkeletonLoader";
import useProviders from "../../hooks/useProviders";
import useUserBookings from "../../hooks/useUserBookings";
import { useUserProfile } from "../../features/profile/useUserProfile";

const CATEGORIES = [
  { label: "Tutors",      icon: BookOpen    },
  { label: "Cleaning",    icon: Sparkles    },
  { label: "Technicians", icon: Wrench      },
  { label: "Fitness",     icon: Dumbbell    },
  { label: "Events",      icon: PartyPopper },
  { label: "Security",    icon: ShieldCheck },
  { label: "Coaching",    icon: Trophy      },
  { label: "Workshops",   icon: Lightbulb   },
];

const UserDashboard = () => {
  const { name } = useUserProfile();
  const firstName = name?.split(" ")[0] || "there";

  const [search, setSearch]             = useState("");
  const [activeCategory, setCategory]   = useState("All");

  const { providers, loading: providersLoading, error: providersError } =
    useProviders({ category: activeCategory, q: search });

  const { bookings: upcomingBookings, loading: bookingsLoading } =
    useUserBookings("Accepted");

  const upcomingCount   = upcomingBookings.length;
  const completedCount  = 0; // TODO: fetch from /user/bookings?status=completed count

  const stats = [
    { icon: CalendarDays,  label: "Upcoming Bookings", value: String(upcomingCount), sub: upcomingCount ? "Scheduled" : "No upcoming bookings", color: "green"  },
    { icon: CheckCircle2,  label: "Completed",          value: String(completedCount), sub: "This month", color: "teal"   },
    { icon: MessageSquare, label: "Messages",           value: "0",  sub: "No new messages", color: "blue"   },
  ];

  const quickActions = [
    { to: "/user/explore",  icon: Search,        label: "Explore Services", sub: "Find providers near you", bg: "bg-emerald-50 hover:bg-emerald-100", iconColor: "text-emerald-600", border: "border-emerald-100" },
    { to: "/user/bookings", icon: CalendarDays,  label: "My Bookings",      sub: "Track your appointments", bg: "bg-blue-50 hover:bg-blue-100",       iconColor: "text-blue-600",    border: "border-blue-100"    },
    { to: "/user/messages", icon: MessageSquare, label: "Messages",         sub: "Chat with providers",     bg: "bg-violet-50 hover:bg-violet-100",   iconColor: "text-violet-600",  border: "border-violet-100"  },
  ];

  return (
    <div className="space-y-6">

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
            Find Trusted <span className="text-emerald-600">Local Services</span><br />Near You
          </h1>
          <p className="text-sm text-slate-500 mt-2 mb-4 leading-relaxed">
            Discover top-rated providers, book services, and track everything in one place.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-emerald-500" strokeWidth={2.5} /> Verified Providers</span>
            <span className="flex items-center gap-1.5"><Zap size={13} className="text-blue-500" strokeWidth={2.5} /> Instant Booking</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Actions</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

      {/* Categories */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Browse Categories</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("All")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
              activeCategory === "All"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            All
          </button>
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setCategory(activeCategory === label ? "All" : label)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
                activeCategory === label
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              <Icon size={12} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Service Discovery */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              {activeCategory !== "All" ? `${activeCategory} Providers` : "Nearby Providers"}
            </h2>
            {!providersLoading && !providersError && (
              <p className="text-xs text-slate-400 mt-0.5">{providers.length} provider{providers.length !== 1 ? "s" : ""} found</p>
            )}
          </div>
          <NavLink to="/user/explore" className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View all <ArrowRight size={13} strokeWidth={2.5} />
          </NavLink>
        </div>

        <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 mb-4 focus-within:border-emerald-400 focus-within:bg-white transition-all">
          <Search size={14} className="text-slate-400 flex-shrink-0" strokeWidth={2} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or category..."
            className="flex-1 bg-transparent text-sm outline-none text-slate-600 placeholder-slate-400 font-medium"
          />
        </div>

        {providersError && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <AlertCircle size={15} strokeWidth={2} className="flex-shrink-0" /> {providersError}
          </div>
        )}

        {providersLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <ProviderCardSkeleton key={i} />)}
          </div>
        )}

        {!providersLoading && !providersError && providers.length === 0 && (
          <div className="py-14 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Search size={24} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-slate-500">No providers found</p>
            <p className="text-xs text-slate-400 mt-1">Try a different search or category.</p>
          </div>
        )}

        {!providersLoading && !providersError && providers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.slice(0, 6).map((p) => <ProviderCard key={p.id} provider={p} />)}
          </div>
        )}
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">Upcoming Bookings</h2>
            <p className="text-xs text-slate-400 mt-0.5">Your scheduled appointments</p>
          </div>
          <NavLink to="/user/bookings" className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
            View all <ArrowRight size={13} strokeWidth={2.5} />
          </NavLink>
        </div>
        {bookingsLoading ? (
          <div className="space-y-3 animate-pulse">
            {[1, 2].map((i) => <div key={i} className="h-16 bg-slate-100 rounded-xl" />)}
          </div>
        ) : upcomingBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-slate-400">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
              <CalendarDays size={24} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-slate-500">No upcoming bookings</p>
            <p className="text-xs mt-1 text-slate-400">Book a service to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-700">{b.service_name || b.service}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{b.provider_name} · {b.date}</p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full capitalize">
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default UserDashboard;
