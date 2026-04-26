import React, { useState } from "react";
import { Search, AlertCircle, BookOpen, Sparkles, Wrench, Dumbbell, PartyPopper, ShieldCheck, Trophy, Lightbulb } from "lucide-react";
import useProviders from "../../hooks/useProviders";
import ProviderCard from "../../components/common/ProviderCard";
import { ProviderCardSkeleton } from "../../components/common/SkeletonLoader";

const CATEGORIES = [
  { label: "All",         icon: null         },
  { label: "Tutors",      icon: BookOpen     },
  { label: "Cleaning",    icon: Sparkles     },
  { label: "Technicians", icon: Wrench       },
  { label: "Fitness",     icon: Dumbbell     },
  { label: "Events",      icon: PartyPopper  },
  { label: "Security",    icon: ShieldCheck  },
  { label: "Coaching",    icon: Trophy       },
  { label: "Workshops",   icon: Lightbulb    },
];

const ProvidersList = () => {
  const [search, setSearch]     = useState("");
  const [category, setCategory] = useState("All");

  const { providers, loading, error } = useProviders({ category, q: search });

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      {/* Page header */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Service Providers</h1>
            <p className="text-xs text-slate-400 mt-0.5">Find trusted professionals near you</p>
          </div>
          {/* Search */}
          <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-full max-w-sm focus-within:border-emerald-400 focus-within:bg-white transition-all">
            <Search size={14} className="text-slate-400 flex-shrink-0" strokeWidth={2} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, category, location..."
              className="flex-1 bg-transparent text-sm outline-none text-slate-600 placeholder-slate-400 font-medium"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-5">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setCategory(label)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
                category === label
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              {Icon && <Icon size={12} strokeWidth={2} />}
              {label}
            </button>
          ))}
        </div>

        {/* Result count */}
        {!loading && !error && (
          <p className="text-xs text-slate-400 font-medium">
            {providers.length} provider{providers.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-center gap-3">
            <AlertCircle size={18} className="text-red-500 flex-shrink-0" strokeWidth={2} />
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => <ProviderCardSkeleton key={i} />)}
          </div>
        )}

        {/* Results */}
        {!loading && !error && providers.length === 0 && (
          <div className="bg-white rounded-2xl p-14 text-center border border-slate-100 shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Search size={24} className="text-slate-300" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-slate-500">No providers found</p>
            <p className="text-xs text-slate-400 mt-1">Try a different search or category.</p>
          </div>
        )}

        {!loading && !error && providers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((p) => <ProviderCard key={p.id} provider={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProvidersList;
