import api from "./axiosInstance";

// GET /providers?category=&q=&city=
export const fetchProviders = (params = {}) =>
  api.get("/providers", { params }).then((r) => r.data);

// GET /providers/:id  (supports "me" with JWT)
export const fetchProviderById = (id) => {
  if (id === "me") {
    const token = localStorage.getItem("token");
    return api.get("/providers/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.data);
  }
  return api.get(`/providers/${id}`).then((r) => r.data);
};

// GET /providers/:id/reviews
export const fetchProviderReviews = (id) => {
  if (id === "me") {
    const userId = localStorage.getItem("userId");
    return api.get(`/providers/${userId}/reviews`).then((r) => r.data);
  }
  return api.get(`/providers/${id}/reviews`).then((r) => r.data);
};
