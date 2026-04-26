import React from "react";
import { CalendarClock, Save } from "lucide-react";
import AvailabilityCalendar from "../../components/dashboard/AvailabilityCalendar";

const Availability = () => (
  <div className="space-y-5 provider-dash">
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
          <CalendarClock size={18} className="text-blue-600" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800">Weekly Availability</h2>
          <p className="text-[11px] text-slate-400">Click slots to mark yourself available. Customers only see open slots.</p>
        </div>
      </div>
      <div className="mt-5">
        <AvailabilityCalendar />
      </div>
    </div>
    <div className="flex justify-end">
      <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm">
        <Save size={15} strokeWidth={2.5} /> Save Availability
      </button>
    </div>
  </div>
);

export default Availability;
