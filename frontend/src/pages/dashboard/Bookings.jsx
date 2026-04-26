import React, { useState, useEffect, useCallback } from "react";
import {
  CalendarDays, Clock, MapPin, MessageSquare,
  CheckCircle, XCircle, PlayCircle, Flag, AlertCircle, X, Loader2,
} from "lucide-react";
import api from "../../services/axiosInstance";
import BookingTabs from "../../components/dashboard/BookingTabs";
import { RowSkeleton } from "../../components/common/SkeletonLoader";

/* ── Status badge config ─────────────────────────────────────────────────── */
const STATUS = {
  pending:   { bg: "bg-amber-50",   text: "text-amber-700",   border: "border-amber-200",   dot: "bg-amber-400"   },
  accepted:  { bg: "bg-blue-50",    text: "text-blue-700",    border: "border-blue-200",    dot: "bg-blue-400"    },
  ongoing:   { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-400" },
  completed: { bg: "bg-green-50",   text: "text-green-700",   border: "border-green-200",   dot: "bg-green-400"   },
  cancelled: { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400"     },
  rejected:  { bg: "bg-red-50",     text: "text-red-600",     border: "border-red-200",     dot: "bg-red-400"     },
};

/* ── Confirm modal ───────────────────────────────────────────────────────── */
const CONFIRM_META = {
  accepted:  { label: "Accept Booking",       btn: "Accept",           color: "bg-emerald-600 hover:bg-emerald-700" },
  cancelled: { label: "Reject Booking",       btn: "Reject",           color: "bg-red-500 hover:bg-red-600"        },
  ongoing:   { label: "Mark as Ongoing",      btn: "Mark as Ongoing",  color: "bg-blue-600 hover:bg-blue-700"      },
  completed: { label: "Mark as Completed",    btn: "Mark Completed",   color: "bg-green-600 hover:bg-green-700"    },
};

const ConfirmModal = ({ action, booking, onConfirm, onClose, loading }) => {
  const meta = CONFIRM_META[action] || {};
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">{meta.label}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={16} strokeWidth={2.5} />
          </button>
        </div>
        <div className="bg-slate-50 rounded-xl p-3 space-y-1.5 text-xs text-slate-500">
          <p><span className="font-semibold text-slate-700">Customer:</span> {booking.user_name || "User"}</p>
          <p><span className="font-semibold text-slate-700">Service:</span> {booking.service_name || "—"}</p>
          <p><span className="font-semibold text-slate-700">Date & Time:</span> {booking.date} {booking.time}</p>
        </div>
        <div className="flex gap-2 justify-end pt-1">
          <button onClick={onClose}
            className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={() => onConfirm(booking.id, action)} disabled={loading}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white transition-colors disabled:opacity-60 ${meta.color}`}>
            {loading && <Loader2 size={12} className="animate-spin" strokeWidth={2.5} />}
            {meta.btn}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Provider booking card ───────────────────────────────────────────────── */
const ProviderBookingCard = ({ booking, onAction }) => {
  const key = booking.status?.toLowerCase();
  const s = STATUS[key] || STATUS.pending;

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 space-y-3">
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-sm flex-shrink-0">
            {(booking.user_name || "U").charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{booking.user_name || "Customer"}</p>
            <p className="text-xs text-slate-400 truncate mt-0.5">{booking.service_name || "Service"}</p>
          </div>
        </div>
        <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize flex-shrink-0 ${s.bg} ${s.text} ${s.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {booking.status}
        </span>
      </div>

      {/* Meta row */}
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

      {/* Action buttons */}
      {key === "pending" && (
        <div className="flex gap-2 pt-1">
          <button onClick={() => onAction(booking, "cancelled")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg text-[11px] font-bold hover:bg-red-100 transition-colors">
            <XCircle size={12} strokeWidth={2.5} /> Reject
          </button>
          <button onClick={() => onAction(booking, "accepted")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-[11px] font-bold hover:bg-emerald-700 transition-colors">
            <CheckCircle size={12} strokeWidth={2.5} /> Accept
          </button>
        </div>
      )}
      {key === "accepted" && (
        <div className="flex gap-2 pt-1">
          <button onClick={() => onAction(booking, "ongoing")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-bold hover:bg-blue-700 transition-colors">
            <PlayCircle size={12} strokeWidth={2.5} /> Mark as Ongoing
          </button>
        </div>
      )}
      {key === "ongoing" && (
        <div className="flex gap-2 pt-1">
          <button onClick={() => onAction(booking, "completed")}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 text-white rounded-lg text-[11px] font-bold hover:bg-green-700 transition-colors">
            <Flag size={12} strokeWidth={2.5} /> Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
};

/* ── Main page ───────────────────────────────────────────────────────────── */
const Bookings = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [confirm, setConfirm]         = useState(null); // { booking, action }
  const [actionLoading, setActionLoading] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    api.get("/bookings/provider/me")
      .then((res) => setAllBookings(res.data))
      .catch((err) => setError(err.response?.data?.detail || "Failed to load bookings"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleConfirm = async (id, status) => {
    setActionLoading(true);
    try {
      await api.put(`/bookings/${id}/status`, { status });
      // Optimistic update
      setAllBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
      setConfirm(null);
    } catch (err) {
      alert(err.response?.data?.detail || "Failed to update booking");
    } finally {
      setActionLoading(false);
    }
  };

  // Client-side filter by tab
  const bookings = activeTab === "All"
    ? allBookings
    : allBookings.filter((b) => b.status?.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="space-y-5 provider-dash">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">Booking Requests</h2>
          <p className="text-xs text-slate-400 mt-0.5">Manage incoming booking requests</p>
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
              ? "Once customers book your services, they'll appear here."
              : `You have no ${activeTab.toLowerCase()} bookings at the moment.`}
          </p>
        </div>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-3">
          {bookings.map((b) => (
            <ProviderBookingCard
              key={b.id}
              booking={b}
              onAction={(booking, action) => setConfirm({ booking, action })}
            />
          ))}
        </div>
      )}

      {confirm && (
        <ConfirmModal
          action={confirm.action}
          booking={confirm.booking}
          onConfirm={handleConfirm}
          onClose={() => setConfirm(null)}
          loading={actionLoading}
        />
      )}
    </div>
  );
};

export default Bookings;
