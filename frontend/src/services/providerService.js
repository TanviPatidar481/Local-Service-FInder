import api from "./axiosInstance";

/**
 * All provider-related API calls.
 * Backend: FastAPI at http://127.0.0.1:8000
 */

// GET /providers?category=&q=&city=
export const fetchProviders = (params = {}) =>
  api.get("/providers", { params }).then((r) => r.data);

// GET /providers/:id
export const fetchProviderById = (id) =>
  api.get(`/providers/${id}`).then((r) => r.data);

// GET /providers/:id/reviews
export const fetchProviderReviews = (id) =>
  api.get(`/providers/${id}/reviews`).then((r) => r.data);
