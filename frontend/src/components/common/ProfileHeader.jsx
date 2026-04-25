import React from "react";
import { MapPin, Tag, Star, BadgeCheck } from "lucide-react";

/**
 * Read-only profile header — used on /providers/:id
 */
const ProfileHeader = ({ provider, reviewCount = 0 }) => {
  const name     = provider.business_name || provider.name || "Provider";
  const category = provider.category || "";
  const city     = provider.city || "";
  const locality = provider.locality || "";
  const rating   = provider.avg_rating ?? null;
  const initial  = name.charAt(0).toUpperCase();

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-start gap-5">
        {provider.avatar ? (
          <img
            src={provider.avatar}
            alt={name}
            className="w-20 h-20 rounded-2xl object-cover shadow-sm flex-shrink-0"
          />
        ) : (
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-sm flex-shrink-0">
            {initial}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">{name}</h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <BadgeCheck size={11} strokeWidth={2.5} /> Verified
            </span>
          </div>

          {category && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <Tag size={12} className="text-emerald-500" strokeWidth={2.5} />
              <span className="text-sm text-slate-500 capitalize font-medium">{category}</span>
            </div>
          )}

          {(city || locality) && (
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={12} className="text-slate-400" strokeWidth={2.5} />
              <span className="text-sm text-slate-400">
                {locality ? `${locality}, ${city}` : city}
              </span>
            </div>
          )}

          {rating !== null && (
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2.5 py-1">
                <Star size={13} className="text-amber-400" strokeWidth={2.5} fill="currentColor" />
                <span className="text-sm font-bold text-amber-600">{Number(rating).toFixed(1)}</span>
              </div>
              {reviewCount > 0 && (
                <span className="text-xs text-slate-400 font-medium">{reviewCount} review{reviewCount !== 1 ? "s" : ""}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
