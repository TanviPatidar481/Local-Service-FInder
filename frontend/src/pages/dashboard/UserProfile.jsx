import React, { useRef, useState, useEffect } from "react";
import {
  MapPin, Mail, Phone, BadgeCheck, CalendarDays,
  Pencil, Camera, CheckCircle2, Heart, Star, User,
  Save, X, Loader2, AlertCircle, ChevronRight, ClipboardList, Clock, Activity
} from "lucide-react";
import useUserProfileData from "../../hooks/useUserProfileData";
import { UserProfileSkeleton } from "../../components/common/SkeletonLoader";

// Highlight Stat Block Component
const StatBlock = ({ icon: Icon, value, label, bg, iconColor }) => (
  <div className="flex flex-col items-center justify-center py-3 px-3">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${bg}`}>
      <Icon size={18} className={iconColor} strokeWidth={2} />
    </div>
    <p className="text-lg font-bold text-slate-800 leading-none mb-0.5">{value}</p>
    <p className="text-xs text-slate-500 font-medium">{label}</p>
  </div>
);

// Personal Info Row Component
const PersonalInfoRow = ({ label, name, value, onChange, editMode, type = "text", readOnly = false, placeholder = "" }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 border-b border-slate-50 last:border-0 gap-2">
    <div className="flex items-center gap-3 w-1/3 min-w-[120px]">
      <User size={16} className="text-slate-400 flex-shrink-0" strokeWidth={1.5} />
      <p className="text-sm font-medium text-slate-600">{label}</p>
    </div>
    <div className="flex-1 flex items-center justify-between">
      {editMode && !readOnly ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full text-sm font-medium text-slate-800 outline-none border-b border-emerald-400 bg-transparent placeholder-slate-300 py-1"
        />
      ) : (
        <p className={`text-sm font-medium ${value ? "text-slate-800" : "text-slate-400"}`}>
          {value || placeholder || "—"}
        </p>
      )}
      {!editMode && <ChevronRight size={16} className="text-slate-300 flex-shrink-0 ml-4" strokeWidth={2} />}
    </div>
  </div>
);

const UserProfile = () => {
  const { profile, loading, saveField } = useUserProfileData();
  const [editMode, setEditMode] = useState(false);
  const [form,     setForm]     = useState(null);
  const [saving,   setSaving]   = useState(false);
  const [toast,    setToast]    = useState(null);
  const avatarRef               = useRef();

  useEffect(() => {
    if (profile) setForm({ ...profile });
  }, [profile]);

  if (loading || !form) return <UserProfileSkeleton />;

  const displayName = form.full_name || "Your Name";
  const location    = [form.city, form.locality].filter(Boolean).join(", ");
  const initial     = displayName.charAt(0).toUpperCase();

  const handle = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleAvatarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((p) => ({ ...p, avatar: ev.target.result }));
    reader.readAsDataURL(file);
  };

  const handleEdit = () => {
    setForm({ ...profile });
    setEditMode(true);
  };

  const handleCancel = () => {
    setForm({ ...profile });
    setEditMode(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      for (const [key, value] of Object.entries(form)) {
        if (value !== (profile[key] ?? "")) {
          await saveField(key, value);
        }
      }
      setEditMode(false);
      setToast({ type: "success", msg: "Profile saved successfully!" });
    } catch {
      setToast({ type: "error", msg: "Failed to save. Try again." });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-4 pb-6 px-4 md:px-0">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold border ${
          toast.type === "success"
            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {toast.type === "success"
            ? <CheckCircle2 size={15} strokeWidth={2.5} />
            : <AlertCircle  size={15} strokeWidth={2.5} />}
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Profile</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your personal information and account</p>
        </div>
        
        {!editMode ? (
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-semibold hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
          >
            <Pencil size={14} strokeWidth={2.5} /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <X size={14} strokeWidth={2.5} /> Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-70"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Top Profile Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-5 md:p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {form.avatar ? (
              <img src={form.avatar} alt={displayName}
                className="w-24 h-24 rounded-full object-cover shadow-sm border border-slate-100 bg-slate-50" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-3xl shadow-sm border border-slate-100">
                <span className="relative z-10">{initial}</span>
              </div>
            )}
            {editMode && (
              <>
                <button
                  onClick={() => avatarRef.current?.click()}
                  className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  <Camera size={14} className="text-slate-700" strokeWidth={2.5} />
                </button>
                <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarFile} />
              </>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left pt-2">
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-2">
              <h2 className="text-2xl font-bold text-slate-900">{displayName}</h2>
              <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-bold w-max mx-auto md:mx-0">
                <CheckCircle2 size={12} strokeWidth={2.5} /> Verified
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {location || "No location set"}</span>
              <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-400" /> {form.email || "No email"}</span>
              <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-400" /> {form.phone || "No phone"}</span>
            </div>
            
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-slate-400">
              <CalendarDays size={12} />
              <span>Member since {profile.member_since || "recently"}</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-100 my-4" />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <StatBlock 
            icon={CalendarDays} 
            value={String(profile.total_bookings ?? 0)} 
            label="Total Bookings" 
            bg="bg-emerald-50" 
            iconColor="text-emerald-500" 
          />
          <StatBlock 
            icon={Heart} 
            value={String(profile.saved_providers ?? 0)} 
            label="Saved Providers" 
            bg="bg-rose-50" 
            iconColor="text-rose-500" 
          />
          <StatBlock 
            icon={Star} 
            value="—" 
            label="Average Rating" 
            bg="bg-amber-50" 
            iconColor="text-amber-500" 
          />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Personal Information */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
          <h3 className="text-base font-bold text-slate-900 mb-3">Personal Information</h3>
          <div className="flex flex-col">
            <PersonalInfoRow label="Full Name" name="full_name" value={form.full_name} onChange={handle} editMode={editMode} placeholder="Enter your full name" />
            <PersonalInfoRow label="Email" name="email" value={form.email} onChange={handle} editMode={editMode} readOnly placeholder="you@email.com" type="email" />
            <PersonalInfoRow label="Phone Number" name="phone" value={form.phone} onChange={handle} editMode={editMode} placeholder="+91 00000 00000" />
            <PersonalInfoRow label="Location" name="city" value={form.city} onChange={handle} editMode={editMode} placeholder="Your City" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Activity size={16} className="text-slate-400" />
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">Your latest interactions</p>
          
          <div className="flex-1 flex flex-col items-center justify-center text-center pb-2">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center rotate-[-5deg]">
                <ClipboardList size={32} className="text-emerald-200" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <Clock size={16} className="text-emerald-500" />
              </div>
            </div>
            <h4 className="text-sm font-bold text-slate-800 mb-1">No recent activity</h4>
            <p className="text-xs text-slate-500 mb-4 max-w-[220px]">Your bookings and activity will appear here.</p>
            <button className="px-4 py-2 bg-white border border-emerald-200 text-emerald-600 rounded-xl text-xs font-bold hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-sm">
              View My Bookings
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfile;
