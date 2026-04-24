import React from "react";
import { Star, Pencil } from "lucide-react";

export const Stars = ({ rating = 0, size = 14 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star key={s} size={size} strokeWidth={2}
        className={s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"} />
    ))}
  </div>
);

export const SectionCard = ({ title, isOwner, onEdit, children }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-md">
    <div className="flex items-center justify-between px-6 pt-5 pb-3">
      <h2 className="text-base font-bold text-slate-900">{title}</h2>
      {isOwner && onEdit && (
        <button onClick={onEdit} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-emerald-600 transition-all">
          <Pencil size={15} strokeWidth={2} />
        </button>
      )}
    </div>
    <div className="px-6 pb-5">{children}</div>
  </div>
);

export const EmptySlot = ({ icon: Icon, label, sub }) => (
  <div className="flex flex-col items-center py-10 gap-2">
    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
      <Icon size={22} className="text-slate-300" strokeWidth={1.5} />
    </div>
    <p className="text-sm font-semibold text-slate-400">{label}</p>
    {sub && <p className="text-xs text-slate-400 text-center max-w-xs">{sub}</p>}
  </div>
);
