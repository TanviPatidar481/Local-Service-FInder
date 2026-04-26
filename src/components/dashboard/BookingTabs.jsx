import React from "react";

const TABS = ["All", "Pending", "Accepted", "Ongoing", "Completed", "Cancelled"];

const BookingTabs = ({ active, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {TABS.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150 ${
          active === tab
            ? "bg-emerald-600 text-white shadow-sm"
            : "bg-white text-slate-500 border border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default BookingTabs;
