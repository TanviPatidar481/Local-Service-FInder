import React from "react";

/** Animated shimmer pulse base */
const Shimmer = ({ className = "" }) => (
  <div className={`animate-pulse bg-slate-200 rounded-lg ${className}`} />
);

/** Card skeleton for provider listing grid */
export const ProviderCardSkeleton = () => (
  <div className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm space-y-3">
    <div className="flex items-start gap-3">
      <Shimmer className="w-11 h-11 rounded-xl flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <Shimmer className="h-3.5 w-3/4" />
        <Shimmer className="h-3 w-1/2" />
      </div>
      <Shimmer className="w-12 h-6 rounded-lg flex-shrink-0" />
    </div>
    <div className="pt-3 border-t border-slate-100">
      <Shimmer className="h-3 w-2/3" />
    </div>
  </div>
);

/** Full-page profile skeleton */
export const ProfileSkeleton = () => (
  <div className="space-y-5 animate-pulse">
    {/* Hero */}
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-2xl bg-slate-200 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-slate-200 rounded w-1/3" />
          <div className="h-3.5 bg-slate-200 rounded w-1/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    </div>
    {/* Info rows */}
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="h-3 bg-slate-200 rounded w-1/5" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
      </div>
    ))}
  </div>
);

/** Inline row skeleton for lists */
export const RowSkeleton = ({ rows = 3 }) => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100">
        <div className="w-10 h-10 rounded-xl bg-slate-200 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-slate-200 rounded w-1/3" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

/** User profile page skeleton — 3-col LinkedIn layout */
export const UserProfileSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_240px] gap-5 animate-pulse">
    {/* Left sidebar */}
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
        <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto" />
        <div className="h-4 bg-slate-200 rounded w-2/3 mx-auto" />
        <div className="h-3 bg-slate-200 rounded w-1/2 mx-auto" />
        <div className="h-8 bg-slate-200 rounded-xl w-full" />
      </div>
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-3.5 bg-slate-200 rounded w-1/2" />
              <div className="h-3 bg-slate-200 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Main */}
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4">
          <div className="h-3 bg-slate-200 rounded w-1/5" />
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="space-y-1.5">
                <div className="h-2.5 bg-slate-200 rounded w-1/3" />
                <div className="h-9 bg-slate-200 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    {/* Right sidebar */}
    <div className="space-y-4">
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-3">
        <div className="h-3 bg-slate-200 rounded w-2/3" />
        <div className="h-2 bg-slate-200 rounded-full w-full" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-3 bg-slate-200 rounded w-3/4" />
        ))}
      </div>
    </div>
  </div>
);

export default Shimmer;
