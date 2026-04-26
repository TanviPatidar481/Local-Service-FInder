import React, { useRef } from "react";
import { User, Phone, Mail, MapPin, Calendar, Globe, Camera, CheckCircle2, Clock, Heart, CalendarDays } from "lucide-react";
import useUserProfileData from "../../hooks/useUserProfileData";
import EditableField from "../../components/profile/EditableField";
import SidebarStats from "../../components/profile/SidebarStats";
import ProfileCompletionCard from "../../components/profile/ProfileCompletionCard";
import { UserProfileSkeleton } from "../../components/common/SkeletonLoader";

// ─── Avatar with upload ───────────────────────────────────────────────────────
const AvatarUpload = ({ name, avatar, onSave, saving }) => {
  const ref = useRef();
  const initial = (name || "U").charAt(0).toUpperCase();

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onSave("avatar", ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-20 h-20 mx-auto">
      {avatar ? (
        <img src={avatar} alt={name} className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-white" />
      ) : (
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-extrabold text-3xl shadow-md border-2 border-white">
          {initial}
        </div>
      )}
      <button
        onClick={() => ref.current?.click()}
        className="absolute bottom-0 right-0 w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center shadow-md border-2 border-white hover:bg-emerald-700 transition-colors"
        title="Change photo"
      >
        <Camera size={13} className="text-white" strokeWidth={2.5} />
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

// ─── Section card ─────────────────────────────────────────────────────────────
const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="px-5 pt-4 pb-2 border-b border-slate-50">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
    </div>
    <div className="px-5 py-4 space-y-1">{children}</div>
  </div>
);

// ─── Read-only stat row ───────────────────────────────────────────────────────
const StatRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
    <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0">
      <Icon size={14} className="text-slate-400" strokeWidth={2} />
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-slate-700 mt-0.5">{value || "—"}</p>
    </div>
    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider">read-only</span>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const UserProfile = () => {
  const { profile, loading, fieldSaving, saveField } = useUserProfileData();

  if (loading || !profile) return <UserProfileSkeleton />;

  const displayName = profile.full_name || "Your Name";
  const username    = profile.username  || "";

  // Convenience wrapper — passes saveField to EditableField
  const ef = (fieldKey, label, icon, opts = {}) => (
    <EditableField
      key={fieldKey}
      fieldKey={fieldKey}
      label={label}
      value={profile[fieldKey] ?? ""}
      onSave={saveField}
      icon={icon}
      {...opts}
    />
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_240px] gap-5 items-start">

      {/* ── LEFT SIDEBAR ── */}
      <div className="space-y-4 lg:sticky lg:top-[72px]">

        {/* Identity card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-6 text-center space-y-3">
          <AvatarUpload
            name={displayName}
            avatar={profile.avatar}
            onSave={saveField}
            saving={fieldSaving["avatar"]}
          />
          <div>
            <h2 className="text-base font-extrabold text-slate-800 tracking-tight leading-tight">{displayName}</h2>
            {username && <p className="text-xs text-slate-400 font-medium mt-0.5">@{username}</p>}
            {profile.city && (
              <p className="flex items-center justify-center gap-1 text-xs text-slate-400 mt-1">
                <MapPin size={11} strokeWidth={2} /> {profile.city}
              </p>
            )}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <CheckCircle2 size={10} strokeWidth={2.5} /> Customer Account
          </span>
          <p className="text-[10px] text-slate-400 leading-relaxed">
            Click any field to edit it inline. Changes are saved instantly.
          </p>
        </div>

        {/* Stats */}
        <SidebarStats
          totalBookings={profile.total_bookings}
          savedProviders={profile.saved_providers}
          memberSince={profile.member_since}
        />
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="space-y-4 min-w-0">

        {/* Basic Information */}
        <Section title="Basic Information">
          {ef("full_name",     "Full Name",      User,     { placeholder: "Enter your full name" })}
          {ef("username",      "Username",       User,     { placeholder: "@username" })}
          {ef("email",         "Email",          Mail,     { placeholder: "you@email.com", type: "email" })}
          {ef("phone",         "Phone Number",   Phone,    { placeholder: "+91 00000 00000" })}
          {ef("date_of_birth", "Date of Birth",  Calendar, { placeholder: "DD/MM/YYYY" })}
        </Section>

        {/* Location */}
        <Section title="Location Information">
          {ef("address",             "Address",              MapPin, { placeholder: "Street address" })}
          {ef("city",                "City",                 MapPin, { placeholder: "City" })}
          {ef("state",               "State",                Globe,  { placeholder: "State" })}
          {ef("pincode",             "Pincode",              MapPin, { placeholder: "Pincode" })}
          {ef("service_area_radius", "Service Area Radius",  Globe,  { placeholder: "e.g. 10 km" })}
        </Section>

        {/* Account Info — read-only */}
        <Section title="Account Information">
          <StatRow icon={Clock}        label="Member Since"    value={profile.member_since} />
          <StatRow icon={CalendarDays} label="Total Bookings"  value={String(profile.total_bookings ?? 0)} />
          <StatRow icon={Heart}        label="Saved Providers" value={String(profile.saved_providers ?? 0)} />
        </Section>

      </div>

      {/* ── RIGHT SIDEBAR ── */}
      <div className="space-y-4 lg:sticky lg:top-[72px]">
        <ProfileCompletionCard profile={profile} />

        {/* Tips */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100 rounded-2xl px-5 py-4 space-y-3">
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Profile Tips</p>
          <ul className="space-y-2.5">
            {[
              "Click any field to edit it directly — no save button needed.",
              "Add a profile photo to build trust with providers.",
              "Keep your phone number updated for quick contact.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-emerald-800 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
