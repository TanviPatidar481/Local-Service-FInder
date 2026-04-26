import React, { useState } from "react";
import {
  CalendarDays, Clock, MapPin, MessageSquare,
  AlertCircle, Star, XCircle, Loader2, X,
} from "lucide-react";
import BookingTabs from "../../components/dashboard/BookingTabs";
import ReviewForm from "../../components/dashboard/ReviewForm";
import ReviewCard from "../../components/dashboard/ReviewCard";
import { RowSkeleton } from "../../components/common/SkeletonLoader";
import useUserBookings from "../../hooks/useUserBookings";
import useUserReviews from "../../hooks/useUserReviews";
import api from "../../services/axiosInstance";

/* ── Status badge config ─────────────────────────────────────────────────── */
const STATUS = {
  pending:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400"   },
  accepted:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-400"    },
  ongoing:   { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  completed: { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200",   dot: "bg-green-400"   },
  cancelled: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400"     },
};

/* ── Cancel confirm modal ────────────────────────────────────────────────── */
const CancelModal = ({ booking, onConfirm, onClose, loading }) => (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-800">Cancel Booking?</h3>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
      <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-500">
        <p><span className="font-semibold text-slate-700">Provider:</span> {booking.provider_name || "Provider"}</p>
        <p><span className="font-semibold text-slate-700">Service:</span> {booking.service_name || "—"}</p>
        <p><span className="font-semibold text-slate-700">Date & Time:</span> {booking.date} {booking.time}</p>
      </div>
      <p className="text-xs text-slate-500">This action cannot be undone. Are you sure you want to cancel?</p>
      <div className="flex gap-2 justify-end pt-1">
        <button onClick={onClose}
          className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          Keep Booking
        </button>
        <button onClick={() => onConfirm(booking.id)} disabled={loading}
          className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-xs font-bold text-white transition-colors disabled:opacity-60">
          {loading && <Loader2 size={12} className="animate-spin" strokeWidth={2.5} />}
          Yes, Cancel
        </button>
      </div>
    </div>
  </div>
);

/* ── Single booking row ──────────────────────────────────────────────────── */
const BookingRow = ({ booking, onCancel, onReviewSubmit, reviewedBookings, submitting }) => {
  const [showForm, setShowForm]     = useState(false);
  const [localReview, setLocalReview] = useState(null);

  const key = booking.status?.toLowerCase();
  const s   = STATUS[key] || STATUS.pending;
  const isCompleted  = key === "completed";
  const canCancel    = key === "pending" || key === "accepted";
  const alreadyReviewed = reviewedBookings.has(booking.id) || !!localReview;

  const handleSubmit = async (data) => {
    const result = await onReviewSubmit(data);
    if (result?.ok) { setLocalReview(data); setShowForm(false); }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-4 space-y-3">
        {/* Top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
              {(booking.provider_name || "P").charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">
                {booking.provider_name || "Provider"}
              </p>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {booking.service_name || "Service"}
              </p>
            </div>
          </div>
          <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize flex-shrink-0 ${s.bg} ${s.text} ${s.border}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
            {booking.status}
          </span>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-medium">
          {booking.date && (
            <span className="flex items-center gap-1"><CalendarDays size={11} strokeWidth={2} />{booking.date}</span>
          )}
          {booking.time && (
            <span className="flex items-center gap-1"><Clock size={11} strokeWidth={2} />{booking.time}</span>
          )}
          {(booking.location || booking.city) && (
            <span className="flex items-center gap-1"><MapPin size={11} strokeWidth={2} />{booking.location || booking.city}</span>
          )}
        </div>

        {/* Message */}
        {booking.message && (
          <div className="flex items-start gap-2 bg-slate-50 rounded-lg px-3 py-2">
            <MessageSquare size={11} className="text-slate-400 mt-0.5 flex-shrink-0" strokeWidth={2} />
            <p className="text-[11px] text-slate-500 italic leading-relaxed">"{booking.message}"</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {canCancel && (
            <button onClick={() => onCancel(booking)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px] font-bold hover:bg-red-100 transition-colors">
              <XCircle size={12} strokeWidth={2.5} /> Cancel Booking
            </button>
          )}
          {isCompleted && !alreadyReviewed && (
            <button onClick={() => setShowForm((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-lg text-[11px] font-bold hover:bg-amber-100 transition-colors">
              <Star size={11} strokeWidth={2.5} /> Write Review
            </button>
          )}
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

/* ── Main page ───────────────────────────────────────────────────────────── */
const UserBookings = () => {
  const [activeTab, setActiveTab]   = useState("All");
  const { bookings, loading, error, refetch } = useUserBookings(activeTab);
  const { reviewedBookings, submitting, submit } = useUserReviews();

  const [cancelTarget, setCancelTarget]   = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const handleCancel = async (id) => {
    setCancelLoading(true);
    try {
      await api.put(`/bookings/${id}/status`, { status: "cancelled" });
      setCancelTarget(null);
      refetch();
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to cancel booking");
    } finally {
      setCancelLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
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
              onCancel={setCancelTarget}
              onReviewSubmit={submit}
              reviewedBookings={reviewedBookings}
              submitting={submitting}
            />
          ))}
        </div>
      )}

      {cancelTarget && (
        <CancelModal
          booking={cancelTarget}
          onConfirm={handleCancel}
          onClose={() => setCancelTarget(null)}
          loading={cancelLoading}
        />
      )}
    </div>
  );
};

export default UserBookings;
