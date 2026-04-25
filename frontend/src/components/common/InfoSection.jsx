import React from "react";

/**
 * Generic labeled info section block.
 * Used on read-only profile pages.
 */
const InfoSection = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
    {title && (
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{title}</p>
    )}
    {children}
  </div>
);

/** Single labeled row inside InfoSection */
export const InfoRow = ({ label, value, icon: Icon }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-slate-50 last:border-0">
      {Icon && (
        <div className="w-7 h-7 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 mt-0.5">
          <Icon size={13} className="text-slate-400" strokeWidth={2} />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-sm font-medium text-slate-700 mt-0.5 leading-relaxed">{value}</p>
      </div>
    </div>
  );
};

export default InfoSection;
