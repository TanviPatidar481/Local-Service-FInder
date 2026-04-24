import React, { useState } from "react";
import { Check } from "lucide-react";

const DAYS  = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

const AvailabilityCalendar = () => {
  const [available, setAvailable] = useState({});

  const toggle = (day, slot) => {
    const key = `${day}-${slot}`;
    setAvailable((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-100">
            <th className="px-4 py-3 text-left text-slate-400 font-bold w-24 text-[11px] uppercase tracking-wider">Time</th>
            {DAYS.map((d) => (
              <th key={d} className="px-3 py-3 text-center text-slate-600 font-bold text-[11px] uppercase tracking-wider">{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map((slot, si) => (
            <tr key={slot} className={`border-b border-slate-50 last:border-0 ${si % 2 === 0 ? "bg-white" : "bg-slate-50/30"}`}>
              <td className="px-4 py-2.5 text-slate-500 font-semibold text-[11px]">{slot}</td>
              {DAYS.map((day) => {
                const key = `${day}-${slot}`;
                const on  = available[key];
                return (
                  <td key={day} className="px-3 py-2 text-center">
                    <button
                      onClick={() => toggle(day, slot)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all duration-150 ${
                        on
                          ? "bg-emerald-500 text-white shadow-sm scale-105"
                          : "bg-slate-100 text-transparent hover:bg-emerald-100 hover:text-emerald-400"
                      }`}
                    >
                      <Check size={13} strokeWidth={3} />
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailabilityCalendar;
