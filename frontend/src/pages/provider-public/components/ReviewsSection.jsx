import React from "react";
import { Star } from "lucide-react";
import { SectionCard, EmptySlot, Stars } from "./ProfileShared";

// Reviews are booking-based — no edit controls ever shown
const ReviewsSection = ({ reviews = [] }) => {
  const avg = reviews.length
    ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <SectionCard title="Reviews">
      {reviews.length === 0 ? (
        <EmptySlot icon={Star} label="No reviews yet" sub="Reviews appear here after completed bookings" />
      ) : (
        <>
          <div className="flex items-center gap-6 mb-5 pb-5 border-b border-slate-100">
            <div className="text-center flex-shrink-0">
              <p className="text-4xl font-extrabold text-slate-800 tracking-tight">{avg}</p>
              <div className="flex justify-center mt-1"><Stars rating={Math.round(avg)} /></div>
              <p className="text-[10px] text-slate-400 mt-1">{reviews.length} reviews</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const pct   = Math.round((count / reviews.length) * 100);
                return (
                  <div key={star} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 w-4">{star}</span>
                    <Star size={9} className="text-amber-400 fill-amber-400 flex-shrink-0" />
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-slate-400 w-3">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {reviews.map((r) => (
              <div key={r.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700 text-sm flex-shrink-0">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{r.name}</p>
                      <Stars rating={r.rating} size={11} />
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{r.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed ml-[52px]">{r.comment}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </SectionCard>
  );
};

export default ReviewsSection;
