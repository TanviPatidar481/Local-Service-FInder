import React, { useState } from "react";
import { Star, X, Send, Loader2 } from "lucide-react";

const TAGS = ["Professional", "On-time", "Clean", "Friendly", "Value for money", "Would recommend"];

/**
 * Inline review form for a completed booking.
 * onSubmit({ booking_id, provider_id, rating, comment, tags }) → async
 * onClose() → collapses the form
 */
const ReviewForm = ({ booking, onSubmit, onClose, submitting }) => {
  const [rating,  setRating]  = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [tags,    setTags]    = useState([]);
  const [error,   setError]   = useState("");

  const toggleTag = (tag) =>
    setTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);

  const handleSubmit = async () => {
    if (rating === 0) { setError("Please select a rating."); return; }
    setError("");
    await onSubmit({
      booking_id:  booking.id,
      provider_id: booking.provider_id,
      rating,
      comment,
      tags,
    });
  };

  return (
    <div className="mt-3 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-slate-700">Write a Review</p>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={14} strokeWidth={2.5} />
        </button>
      </div>

      {/* Star rating */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rating</p>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(n)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={24}
                strokeWidth={1.5}
                className={`transition-colors ${
                  n <= (hovered || rating) ? "text-amber-400 fill-amber-400" : "text-slate-300"
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-xs font-semibold text-slate-500">
              {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]}
            </span>
          )}
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      {/* Tags */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Quick Tags</p>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                tags.includes(tag)
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Comment (optional)</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this provider…"
          rows={3}
          className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 resize-none transition-all bg-white placeholder-slate-300"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors disabled:opacity-60"
      >
        {submitting
          ? <><Loader2 size={13} className="animate-spin" strokeWidth={2.5} /> Submitting…</>
          : <><Send size={13} strokeWidth={2.5} /> Submit Review</>}
      </button>
    </div>
  );
};

export default ReviewForm;
