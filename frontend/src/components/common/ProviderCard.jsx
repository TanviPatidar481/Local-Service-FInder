import React from "react";
import { MapPin, Star, Tag, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Reusable provider card for listing pages.
 * Navigates to /providers/:id on click.
 */
const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();
  const initial  = (provider.business_name || provider.name || "P").charAt(0).toUpperCase();
  const name     = provider.business_name || provider.name || "Unknown";
  const category = provider.category || "—";
  const rating   = provider.avg_rating ?? provider.rating ?? null;
  const location = provider.city
    ? provider.locality ? `${provider.locality}, ${provider.city}` : provider.city
    : provider.location || "—";

  return (
    <div
      onClick={() => navigate(`/providers/${provider.id}`)}
      className="bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group"
    >
      <div className="flex items-start gap-3 mb-3">
        {provider.avatar ? (
          <img
            src={provider.avatar}
            alt={name}
            className="w-11 h-11 rounded-xl object-cover flex-shrink-0 shadow-sm"
          />
        ) : (
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm flex-shrink-0">
            {initial}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-slate-800 leading-tight truncate">{name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Tag size={10} className="text-emerald-500" strokeWidth={2.5} />
            <p className="text-[11px] text-slate-500 capitalize truncate">{category}</p>
          </div>
        </div>
        {rating !== null && (
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2 py-1 flex-shrink-0">
            <Star size={11} className="text-amber-400" strokeWidth={2.5} fill="currentColor" />
            <span className="text-xs font-bold text-amber-600">{Number(rating).toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <MapPin size={11} strokeWidth={2} />
          {location}
        </span>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" strokeWidth={2} />
      </div>
    </div>
  );
};

export default ProviderCard;
