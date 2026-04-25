import React from "react";
import { Star } from "lucide-react";

// TODO: replace with → GET /provider/reviews

const Reviews = () => (
  <div className="space-y-5 provider-dash">
    <div className="bg-white rounded-2xl p-14 text-center border border-slate-100 shadow-sm">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
        <Star size={24} className="text-slate-300" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-slate-500">No reviews yet</p>
      <p className="text-xs text-slate-400 mt-1">
        Complete bookings to start receiving reviews from customers.
      </p>
    </div>
  </div>
);

export default Reviews;
