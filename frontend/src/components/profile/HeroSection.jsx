import React, { useState } from "react";
import {
  MapPin, Tag, Globe, BadgeCheck, CalendarDays, MessageSquare,
  Pencil, Camera, Plus, ImagePlus, Star, CheckCircle2, Zap,
} from "lucide-react";
import { Stars } from "./ProfileShared";

const HeroSection = ({ profile, isOwner, avgRating, reviewCount, completedBookings = 0, onSave, onAddService, onAddPost }) => {
  const [editingBio, setEditingBio] = useState(false);
  const [bioDraft,   setBioDraft]   = useState(profile.description);

  const { businessName, contactPerson, description, category, city, locality, serviceMode } = profile;

  const saveBio   = () => { onSave({ description: bioDraft }); setEditingBio(false); };
  const cancelBio = () => { setBioDraft(description); setEditingBio(false); };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-md overflow-hidden">

      {/* Cover — bg.jpg with dark overlay */}
      <div className="h-52 relative group overflow-hidden"
        style={{ backgroundImage: "url('/bg.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        {isOwner && (
          <button className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/40 hover:bg-black/60 text-white text-[11px] font-semibold rounded-lg backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100">
            <Camera size={12} strokeWidth={2} /> Edit cover
          </button>
        )}
      </div>

      {/* Profile body */}
      <div className="px-6 pb-5">

        {/* Avatar + actions row */}
        <div className="flex items-start justify-between">

          {/* Avatar — overlaps cover */}
          <div className="relative group/avatar -mt-10 mr-4 flex-shrink-0">
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-emerald-100 to-green-200 border-4 border-white shadow-md flex items-center justify-center text-5xl font-extrabold text-emerald-600 select-none">
              {(businessName || "B").charAt(0).toUpperCase()}
            </div>
            {isOwner && (
              <button className="absolute inset-0 rounded-full bg-black/30 text-white flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-all">
                <Camera size={22} strokeWidth={1.8} />
              </button>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 pt-3 flex-wrap justify-end">
            {isOwner && (
              <>
                <button onClick={onAddService}
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-bold hover:bg-slate-50 transition-all">
                  <Plus size={14} strokeWidth={2.5} /> Add service
                </button>
                <button onClick={onAddPost}
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-bold hover:bg-slate-50 transition-all">
                  <ImagePlus size={14} strokeWidth={2.5} /> Add post
                </button>
                <button onClick={() => setEditingBio(true)}
                  className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 text-slate-600 rounded-full text-sm font-bold hover:bg-slate-50 transition-all">
                  <Pencil size={13} strokeWidth={2.5} /> Edit profile
                </button>
              </>
            )}
            {/* Message + Book Now always visible */}
            <button className="flex items-center gap-1.5 px-5 py-2 border-2 border-emerald-600 text-emerald-700 rounded-full text-sm font-bold hover:bg-emerald-50 transition-all">
              <MessageSquare size={14} strokeWidth={2.5} /> Message
            </button>
            <button className="flex items-center gap-1.5 px-5 py-2 bg-emerald-600 text-white rounded-full text-sm font-bold hover:bg-emerald-700 transition-all shadow-sm">
              <CalendarDays size={14} strokeWidth={2.5} /> Book Now
            </button>
          </div>
        </div>

        {/* Name + meta */}
        <div className="mt-3 space-y-1.5">

          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {businessName || "Business Name"}
            </h1>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <BadgeCheck size={10} strokeWidth={2.5} /> Verified
            </span>
          </div>

          {contactPerson && <p className="text-sm text-slate-600 font-medium">{contactPerson}</p>}

          <div className="flex items-center gap-3 flex-wrap text-xs text-slate-500 font-medium">
            {category && (
              <span className="flex items-center gap-1">
                <Tag size={11} className="text-emerald-500" strokeWidth={2.5} />
                <span className="capitalize">{category}</span>
              </span>
            )}
            {city && (
              <span className="flex items-center gap-1">
                <MapPin size={11} className="text-slate-400" strokeWidth={2.5} />
                {city}{locality ? `, ${locality}` : ""}
              </span>
            )}
            {serviceMode && (
              <span className="flex items-center gap-1">
                <Globe size={11} className="text-slate-400" strokeWidth={2.5} />
                <span className="capitalize">{serviceMode}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Stars rating={avgRating} size={13} />
            <span className="text-xs font-bold text-amber-600">
              {avgRating > 0 ? avgRating.toFixed(1) : ""}
            </span>
            <span className="text-xs text-emerald-600 font-semibold cursor-pointer hover:underline">
              {reviewCount > 0 ? `${reviewCount} reviews` : "No reviews yet"}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap pt-0.5">
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
              {completedBookings > 0 ? `${completedBookings} bookings completed` : "New provider"}
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
              <Zap size={12} className="text-violet-500" strokeWidth={2.5} />
              Fast response
            </span>
          </div>
        </div>

        {/* Bio — inline editable */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          {isOwner && !editingBio && (
            <div className="flex items-start gap-2 group/bio">
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                {description || <span className="text-slate-400 italic text-xs">Add a summary to tell customers about your business...</span>}
              </p>
              <button onClick={() => setEditingBio(true)}
                className="opacity-0 group-hover/bio:opacity-100 flex-shrink-0 p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-all">
                <Pencil size={13} strokeWidth={2.5} />
              </button>
            </div>
          )}
          {isOwner && editingBio && (
            <div className="space-y-2">
              <textarea autoFocus value={bioDraft} onChange={(e) => setBioDraft(e.target.value)} rows={4}
                placeholder="Tell customers about your business, experience, and what makes you unique..."
                className="w-full border border-emerald-300 rounded-lg px-3 py-2.5 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-emerald-100 resize-none" />
              <div className="flex gap-2">
                <button onClick={saveBio} className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-bold rounded-full hover:bg-emerald-700">Save</button>
                <button onClick={cancelBio} className="px-4 py-1.5 border border-slate-300 text-slate-600 text-xs font-bold rounded-full hover:bg-slate-50">Cancel</button>
              </div>
            </div>
          )}
          {!isOwner && (
            <p className="text-sm text-slate-600 leading-relaxed">
              {description || <span className="text-slate-400 italic text-xs">No summary added yet.</span>}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default HeroSection;
