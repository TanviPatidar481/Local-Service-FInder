import React, { useState } from "react";
import { MapPin, Globe, Tag, Pencil, Save, X, CalendarDays, MessageSquare, LayoutDashboard, BookOpen, Clock } from "lucide-react";

const InfoRow = ({ icon: Icon, label, value, isOwner, field, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);

  const commit = () => { onSave({ [field]: draft }); setEditing(false); };
  const cancel = () => { setDraft(value); setEditing(false); };

  return (
    <div className="flex items-start gap-3 group py-2 border-b border-slate-100 last:border-0">
      <Icon size={16} className="text-slate-400 flex-shrink-0 mt-0.5" strokeWidth={1.8} />
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
        {editing ? (
          <div className="flex items-center gap-1.5">
            <input autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") cancel(); }}
              className="flex-1 border-b border-emerald-400 text-sm font-medium text-slate-700 outline-none bg-transparent py-0.5" />
            <button onClick={commit}><Save size={12} className="text-emerald-600" strokeWidth={2.5} /></button>
            <button onClick={cancel}><X size={12} className="text-slate-400" strokeWidth={2.5} /></button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-slate-700 capitalize truncate flex-1">
              {value || <span className="text-slate-300 font-normal italic text-xs">Not set</span>}
            </p>
            {isOwner && (
              <button onClick={() => setEditing(true)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-slate-100 text-slate-300 hover:text-emerald-600 transition-all flex-shrink-0">
                <Pencil size={11} strokeWidth={2.5} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const InfoSidebar = ({ profile, isOwner, onSave }) => {
  const { city, locality, serviceMode, category, businessName } = profile;

  return (
    <div className="space-y-3">

      {/* Book CTA — user only */}
      {!isOwner && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-4">
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            Book with {businessName || "this provider"}
          </h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Check availability and schedule a session.
          </p>
          <button className="w-full bg-emerald-600 text-white text-sm font-bold py-2.5 rounded-full hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 mb-2">
            <CalendarDays size={15} strokeWidth={2.5} /> Book Now
          </button>
          <button className="w-full border-2 border-emerald-600 text-emerald-700 text-sm font-bold py-2.5 rounded-full hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2">
            <MessageSquare size={15} strokeWidth={2.5} /> Message
          </button>
        </div>
      )}

      {/* Info card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-4">
        <h3 className="text-sm font-bold text-slate-800 mb-2">About</h3>
        <InfoRow icon={MapPin} label="Location"     field="city"        value={city ? `${city}${locality ? `, ${locality}` : ""}` : ""} isOwner={isOwner} onSave={onSave} />
        <InfoRow icon={Globe}  label="Service Mode" field="serviceMode" value={serviceMode} isOwner={isOwner} onSave={onSave} />
        <InfoRow icon={Tag}    label="Category"     field="category"    value={category}    isOwner={isOwner} onSave={onSave} />
      </div>

      {/* Owner quick links */}
      {isOwner && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-4">
          <h3 className="text-sm font-bold text-slate-800 mb-3">Manage</h3>
          <div className="space-y-1">
            {[
              { label: "Dashboard",    to: "/provider/overview",     icon: LayoutDashboard },
              { label: "Bookings",     to: "/provider/bookings",     icon: BookOpen },
              { label: "Availability", to: "/provider/availability", icon: Clock },
            ].map(({ label, to, icon: Icon }) => (
              <a key={to} href={to}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-600 hover:text-emerald-700 transition-all group">
                <Icon size={15} className="text-slate-400 group-hover:text-emerald-600" strokeWidth={1.8} />
                {label}
                <span className="ml-auto text-slate-300 group-hover:text-emerald-400 text-xs">→</span>
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default InfoSidebar;
