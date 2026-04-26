import React, { useState } from "react";
import { CalendarDays, AlertCircle, Clock, Star } from "lucide-react";
import BookingTabs from "../../components/dashboard/BookingTabs";
import ReviewForm from "../../components/dashboard/ReviewForm";
import ReviewCard from "../../components/dashboard/ReviewCard";
import { RowSkeleton } from "../../components/common/SkeletonLoader";
import useUserBookings from "../../hooks/useUserBookings";
import useUserReviews from "../../hooks/useUserReviews";

const STATUS = {
  pending:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400"   },
  accepted:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-400"    },
  ongoing:   { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  completed: { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200",   dot: "bg-green-400"   },
  cancelled: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400"     },
};

const BookingRow = ({ booking, onReviewSubmit, reviewedBookings, submitting }) => {
  const [showForm, setShowForm] = useState(false);
  const [localReview, setLocalReview] = useState(null);

  const key = booking.status?.toLowerCase();
  const s = STATUS[key] || STATUS.pending;
  const isCompleted = key === "completed";
  const alreadyReviewed = reviewedBookings.has(booking.id) || !!localReview;

  const handleSubmit = async (data) => {
    const result = await onReviewSubmit(data);
    if (result?.ok) {
      setLocalReview(data);
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              {(booking.provider_name || booking.providerName || "P").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {booking.provider_name || booking.providerName || "Provider"}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {booking.service_name || booking.service || "Service"}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 font-medium">
                {booking.date && (
                  <span className="flex items-center gap-1">
                    <CalendarDays size={10} strokeWidth={2} /> {booking.date}
                  </span>
                )}
                {booking.time && (
                  <span className="flex items-center gap-1">
                    <Clock size={10} strokeWidth={2} /> {booking.time}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 flex-shrink-0">
            <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize ${s.bg} ${s.text} ${s.border}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {booking.status}
            </span>
            {isCompleted && !alreadyReviewed && (
              <button
                onClick={() => setShowForm((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-[11px] font-bold hover:bg-amber-100 transition-colors"
              >
                <Star size={11} strokeWidth={2.5} /> Write Review
              </button>
            )}
          </div>
        </div>

        {showForm && !alreadyReviewed && (
          <ReviewForm
            booking={booking}
            onSubmit={handleSubmit}
            onClose={() => setShowForm(false)}
            submitting={submitting}
          />
        )}

        {alreadyReviewed && (localReview || booking.review) && (
          <ReviewCard review={localReview || booking.review} />
        )}
      </div>
    </div>
  );
};

const UserBookings = () => {
  const [activeTab, setActiveTab] = useState("All");
  const { bookings, loading, error } = useUserBookings(activeTab);
  const { reviewedBookings, submitting, submit } = useUserReviews();

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">My Bookings</h2>
          <p className="text-xs text-slate-400 mt-0.5">Track your service appointments</p>
        </div>
        {!loading && (
          <span className="text-xs bg-slate-100 text-slate-500 font-semibold px-3 py-1 rounded-full">
            {bookings.length} booking{bookings.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      <BookingTabs active={activeTab} onChange={setActiveTab} />

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" strokeWidth={2} />
          <p className="text-sm font-medium text-red-700">{error}</p>
        </div>
      )}

      {loading && <RowSkeleton rows={4} />}

      {!loading && !error && bookings.length === 0 && (
        <div className="bg-white rounded-2xl p-14 text-center border border-slate-100 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <CalendarDays size={24} className="text-slate-300" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-slate-500">
            {activeTab === "All" ? "No bookings yet" : `No ${activeTab.toLowerCase()} bookings`}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {activeTab === "All"
              ? "Book a service to get started."
              : `You have no ${activeTab.toLowerCase()} bookings at the moment.`}
          </p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <BookingRow
              key={b.id}
              booking={b}
              onReviewSubmit={submit}
              reviewedBookings={reviewedBookings}
              submitting={submitting}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
