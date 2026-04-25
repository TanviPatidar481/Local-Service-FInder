import React, { useState } from "react";
import { Building2, User, Phone, Globe, Tag, MapPin, FileText, Save, BadgeCheck, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProviderProfile } from "../../features/profile/useProviderProfile";

const Field = ({ label, name, value, onChange, icon: Icon }) => (
  <div>
    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
    <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-100 transition-all bg-white">
      {Icon && <Icon size={14} className="text-slate-400 flex-shrink-0" strokeWidth={2} />}
      <input type="text" name={name} value={value} onChange={onChange}
        className="flex-1 text-sm font-medium text-slate-700 outline-none bg-transparent placeholder-slate-300" />
    </div>
  </div>
);

const Profile = () => {
  const saved    = useProviderProfile();
  const navigate = useNavigate();

  // TODO: get real provider id from auth token / localStorage
  const providerId = localStorage.getItem("providerId") || "me";

  const [form, setForm] = useState({
    businessName:   saved.businessName,
    contactPerson:  saved.contactPerson,
    phoneNumber:    saved.phoneNumber,
    alternatePhone: saved.alternatePhone,
    serviceMode:    saved.serviceMode,
    description:    saved.description,
    city:           saved.city,
    locality:       saved.locality,
    address:        saved.address,
    pincode:        saved.pincode,
    landmark:       saved.landmark,
    category:       saved.category,
  });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = () => {
    localStorage.setItem("businessBasicInfo", JSON.stringify({
      businessName: form.businessName, contactPerson: form.contactPerson,
      phoneNumber: form.phoneNumber, alternatePhone: form.alternatePhone,
      serviceMode: form.serviceMode, description: form.description,
    }));
    localStorage.setItem("businessLocation", JSON.stringify({
      city: form.city, locality: form.locality, address: form.address,
      pincode: form.pincode, landmark: form.landmark,
    }));
    localStorage.setItem("businessCategory", JSON.stringify({ category: form.category }));
    alert("Profile updated!");
  };

  return (
    <div className="max-w-3xl space-y-5 provider-dash">

      {/* Header card */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-sm">
          {(form.businessName || "B").charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <h2 className="text-base font-extrabold text-slate-800 tracking-tight">{form.businessName || "Your Business"}</h2>
          <p className="text-xs text-slate-500 capitalize mt-0.5">{form.category || "—"} · {form.city || "—"}</p>
          <span className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
            <BadgeCheck size={11} strokeWidth={2.5} /> Verified Provider
          </span>
        </div>
        <button
          onClick={() => navigate(`/provider/${providerId}/view`)}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:border-emerald-300 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex-shrink-0"
        >
          <ExternalLink size={13} strokeWidth={2.5} /> View Public Profile
        </button>
      </div>

      {/* Basic Info */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Basic Information</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Business Name"   name="businessName"   value={form.businessName}   onChange={handleChange} icon={Building2} />
          <Field label="Contact Person"  name="contactPerson"  value={form.contactPerson}  onChange={handleChange} icon={User} />
          <Field label="Phone Number"    name="phoneNumber"    value={form.phoneNumber}    onChange={handleChange} icon={Phone} />
          <Field label="Alternate Phone" name="alternatePhone" value={form.alternatePhone} onChange={handleChange} icon={Phone} />
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Service Mode</label>
            <div className="flex items-center gap-2.5 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-100 transition-all bg-white">
              <Globe size={14} className="text-slate-400 flex-shrink-0" strokeWidth={2} />
              <select name="serviceMode" value={form.serviceMode} onChange={handleChange}
                className="flex-1 text-sm font-medium text-slate-700 outline-none bg-transparent">
                <option value="">Select</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          <Field label="Category" name="category" value={form.category} onChange={handleChange} icon={Tag} />
        </div>
        <div className="mt-4">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Description</label>
          <div className="flex gap-2.5 border border-slate-200 rounded-xl px-3 py-2.5 focus-within:border-emerald-400 focus-within:ring-1 focus-within:ring-emerald-100 transition-all bg-white">
            <FileText size={14} className="text-slate-400 flex-shrink-0 mt-0.5" strokeWidth={2} />
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              className="flex-1 text-sm font-medium text-slate-700 outline-none bg-transparent resize-none" />
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Location</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="City"     name="city"     value={form.city}     onChange={handleChange} icon={MapPin} />
          <Field label="Locality" name="locality" value={form.locality} onChange={handleChange} icon={MapPin} />
          <Field label="Pincode"  name="pincode"  value={form.pincode}  onChange={handleChange} icon={MapPin} />
          <Field label="Landmark" name="landmark" value={form.landmark} onChange={handleChange} icon={MapPin} />
        </div>
        <div className="mt-4">
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows={2}
            className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 resize-none transition-all" />
        </div>
      </div>

      <button onClick={handleSave}
        className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm">
        <Save size={15} strokeWidth={2.5} /> Save Changes
      </button>
    </div>
  );
};

export default Profile;
