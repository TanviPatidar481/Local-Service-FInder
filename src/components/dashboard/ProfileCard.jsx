import React from "react";
import { MapPin, Tag } from "lucide-react";
import CompletionProgress from "./CompletionProgress";
import { useProviderProfile } from "../../features/profile/useProviderProfile";

const ProfileCard = () => {
  const { businessName, contactPerson, city, locality, category, completionPercent } = useProviderProfile();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
          {(businessName || "B").charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-bold text-slate-800 leading-tight truncate">
            {businessName || "Your Business"}
          </h2>
          {category && (
            <div className="flex items-center gap-1 mt-1">
              <Tag size={10} className="text-emerald-500" strokeWidth={2.5} />
              <p className="text-[11px] text-slate-500 capitalize truncate">{category}</p>
            </div>
          )}
          {city && (
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin size={10} className="text-slate-400" strokeWidth={2.5} />
              <p className="text-[11px] text-slate-400 truncate">{city}{locality ? `, ${locality}` : ""}</p>
            </div>
          )}
        </div>
      </div>
      <CompletionProgress percent={completionPercent} />
    </div>
  );
};

export default ProfileCard;
