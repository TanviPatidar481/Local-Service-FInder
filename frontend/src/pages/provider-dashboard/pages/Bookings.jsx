import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import BookingTabs from "../components/BookingTabs";

// TODO: replace with → GET /provider/bookings?status=<tab>

const EmptyState = ({ tab }) => (
  <div className="bg-white rounded-2xl p-14 text-center border border-slate-100 shadow-sm">
    <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
      <CalendarDays size={24} className="text-slate-300" strokeWidth={1.5} />
    </div>
    <p className="text-sm font-semibold text-slate-500">
      {tab === "All" ? "No bookings yet" : `No ${tab.toLowerCase()} bookings`}
    </p>
    <p className="text-xs text-slate-400 mt-1">
      {tab === "All"
        ? "Once customers book your services, they'll appear here."
        : `You have no ${tab.toLowerCase()} bookings at the moment.`}
    </p>
  </div>
);

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div className="space-y-5 provider-dash">
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">All Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage your booking lifecycle</p>
        </div>
        <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-3 py-1 rounded-full">
          0 bookings
        </span>
      </div>

      <BookingTabs active={activeTab} onChange={setActiveTab} />

      <EmptyState tab={activeTab} />
    </div>
  );
};

export default Bookings;
