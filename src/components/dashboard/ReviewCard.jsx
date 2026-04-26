import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

/**
 * Displays a submitted review — used in booking history.
 */
const ReviewCard = ({ review }) => (
  <div className="mt-3 bg-emerald-50 border border-emerald-100 rounded-xl p-4 space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star
            key={n}
            size={14}
            strokeWidth={0}
            className={n <= review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-200"}
          />
        ))}
        <span className="ml-1.5 text-xs font-bold text-amber-600">{review.rating}/5</span>
      </div>
      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
        <CheckCircle2 size={11} strokeWidth={2.5} /> Reviewed
      </span>
    </div>

    {review.tags?.length > 0 && (
      <div className="flex flex-wrap gap-1.5">
        {review.tags.map((tag) => (
          <span key={tag} className="px-2 py-0.5 bg-white border border-emerald-200 text-emerald-700 text-[10px] font-semibold rounded-full">
            {tag}
          </span>
        ))}
      </div>
    )}

    {review.comment && (
      <p className="text-xs text-slate-600 leading-relaxed">{review.comment}</p>
    )}
  </div>
);

export default ReviewCard;
