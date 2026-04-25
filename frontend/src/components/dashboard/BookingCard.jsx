import React from "react";
import { CalendarDays, Clock, ChevronRight } from "lucide-react";

const statusConfig = {
  pending:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400" },
  accepted:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-400" },
  ongoing:   { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  completed: { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200",   dot: "bg-green-400" },
  cancelled: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400" },
};

const BookingCard = ({ booking }) => {
  const s = statusConfig[booking.status] || statusConfig.pending;
  return (
    <div className="bg-white rounded-xl p-4 border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            {booking.customerName.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">{booking.customerName}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{booking.service}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${s.bg} ${s.text} ${s.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {booking.status}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1"><CalendarDays size={11} strokeWidth={2} /> {booking.date}</span>
          <span className="flex items-center gap-1"><Clock size={11} strokeWidth={2} /> {booking.time}</span>
        </div>
        <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors" strokeWidth={2} />
      </div>
    </div>
  );
};

export default BookingCard;
