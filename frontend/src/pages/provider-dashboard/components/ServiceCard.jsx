import React from "react";
import { Clock, IndianRupee, Pencil, Trash2 } from "lucide-react";

const ServiceCard = ({ service, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
    <div className="flex items-start justify-between mb-3">
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-bold text-slate-800 leading-tight">{service.name}</h3>
        <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">{service.description}</p>
      </div>
      <div className="flex items-center gap-0.5 ml-3 flex-shrink-0 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-1">
        <IndianRupee size={11} className="text-emerald-600" strokeWidth={2.5} />
        <span className="text-sm font-extrabold text-emerald-600">{service.price}</span>
      </div>
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
      <span className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
        <Clock size={11} strokeWidth={2} /> {service.duration}
      </span>
      <div className="flex gap-1">
        <button onClick={() => onEdit?.(service)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-emerald-600 hover:bg-emerald-50 transition-colors">
          <Pencil size={11} strokeWidth={2.5} /> Edit
        </button>
        <button onClick={() => onDelete?.(service)}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold text-red-500 hover:bg-red-50 transition-colors">
          <Trash2 size={11} strokeWidth={2.5} /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default ServiceCard;
