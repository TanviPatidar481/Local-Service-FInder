import React from "react";

const palettes = {
  green:  { bg: "bg-emerald-50", icon: "text-emerald-600", val: "text-emerald-700" },
  orange: { bg: "bg-orange-50",  icon: "text-orange-500",  val: "text-orange-600" },
  teal:   { bg: "bg-teal-50",    icon: "text-teal-600",    val: "text-teal-700" },
  amber:  { bg: "bg-amber-50",   icon: "text-amber-500",   val: "text-amber-600" },
  blue:   { bg: "bg-blue-50",    icon: "text-blue-600",    val: "text-blue-700" },
};

const StatCard = ({ icon: Icon, label, value, sub, color = "green" }) => {
  const p = palettes[color] || palettes.green;
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${p.bg} ${p.icon}`}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <p className={`text-xl font-extrabold leading-none tracking-tight ${p.val}`}>{value}</p>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">{label}</p>
        {sub && <p className="text-[10px] text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
};

export default StatCard;
