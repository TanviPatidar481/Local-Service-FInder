import React, { useState } from "react";
import { Bell, MessageSquare, CalendarCheck, Lock, Shield, AlertTriangle } from "lucide-react";

const Toggle = ({ on, onToggle }) => (
  <button onClick={onToggle}
    className={`w-11 h-6 rounded-full transition-all duration-200 relative flex-shrink-0 ${on ? "bg-emerald-500 shadow-sm" : "bg-slate-200"}`}>
    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0.5"}`} />
  </button>
);

const Settings = () => {
  const [notifs, setNotifs] = useState({ email: true, sms: false, bookingAlerts: true });
  const toggle = (key) => setNotifs((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="max-w-2xl space-y-5 provider-dash">

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Notifications</p>
        <div className="space-y-4">
          {[
            { key: "email",         icon: Bell,          label: "Email Notifications", desc: "Receive booking updates via email" },
            { key: "sms",           icon: MessageSquare, label: "SMS Notifications",   desc: "Receive booking updates via SMS" },
            { key: "bookingAlerts", icon: CalendarCheck, label: "New Booking Alerts",  desc: "Get alerted for new booking requests" },
          ].map(({ key, icon: Icon, label, desc }) => (
            <div key={key} className="flex items-center justify-between gap-4 py-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700">{label}</p>
                  <p className="text-[11px] text-slate-400">{desc}</p>
                </div>
              </div>
              <Toggle on={notifs[key]} onToggle={() => toggle(key)} />
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Account</p>
        <div className="space-y-2">
          {[
            { icon: Lock,   label: "Change Password",  desc: "Update your login credentials" },
            { icon: Shield, label: "Privacy Settings", desc: "Control your data and visibility" },
          ].map(({ icon: Icon, label, desc }) => (
            <button key={label} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all text-left">
              <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0">
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-700">{label}</p>
                <p className="text-[11px] text-slate-400">{desc}</p>
              </div>
              <span className="text-slate-300 text-sm">→</span>
            </button>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-2xl p-5 border border-red-100 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle size={15} className="text-red-500" strokeWidth={2} />
          <p className="text-[11px] font-bold text-red-500 uppercase tracking-widest">Danger Zone</p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Deactivate Account</p>
            <p className="text-[11px] text-slate-400">Your profile will be hidden from all users</p>
          </div>
          <button className="px-4 py-2 border border-red-200 text-red-600 rounded-xl text-xs font-bold hover:bg-red-50 transition-colors flex-shrink-0">
            Deactivate
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;
