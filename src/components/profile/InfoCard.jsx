import React from "react";
import { Pencil } from "lucide-react";

/**
 * Section card with optional edit toggle per-section.
 */
const InfoCard = ({ title, children, editMode, onEdit, showEditBtn = false }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
    <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-50">
      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      {showEditBtn && !editMode && (
        <button
          onClick={onEdit}
          className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <Pencil size={11} strokeWidth={2.5} /> Edit
        </button>
      )}
    </div>
    <div className="px-5 py-4">{children}</div>
  </div>
);

export default InfoCard;
