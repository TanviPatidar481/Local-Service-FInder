import api from "./axiosInstance";

// POST /reviews  — submit a review for a completed booking
export const submitReview = (data) =>
  api.post("/reviews", data).then((r) => r.data);

// GET /reviews/user/:userId  — all reviews written by this user
export const fetchUserReviews = (userId) =>
  api.get(`/reviews/user/${userId}`).then((r) => r.data);

// GET /bookings/:bookingId/review  — check if review exists for a booking
export const fetchBookingReview = (bookingId) =>
  api.get(`/bookings/${bookingId}/review`).then((r) => r.data);
