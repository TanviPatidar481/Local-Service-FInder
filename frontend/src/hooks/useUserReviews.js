import { useState, useCallback } from "react";
import { submitReview, fetchBookingReview } from "../services/reviewService";

/**
 * Manages review submission state per booking.
 * reviewedBookings: Set of bookingIds already reviewed.
 */
const useUserReviews = () => {
  const [reviewedBookings, setReviewedBookings] = useState(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const checkReviewed = useCallback(async (bookingId) => {
    try {
      await fetchBookingReview(bookingId);
      setReviewedBookings((p) => new Set([...p, bookingId]));
      return true;
    } catch {
      return false;
    }
  }, []);

  const submit = async (reviewData) => {
    setSubmitting(true);
    setError(null);
    try {
      await submitReview(reviewData);
      setReviewedBookings((p) => new Set([...p, reviewData.booking_id]));
      return { ok: true };
    } catch (err) {
      const msg = err?.response?.data?.detail || "Failed to submit review.";
      setError(msg);
      return { ok: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  };

  return { reviewedBookings, submitting, error, submit, checkReviewed };
};

export default useUserReviews;
