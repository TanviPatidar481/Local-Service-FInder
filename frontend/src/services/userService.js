import api from "./axiosInstance";

// GET /users/:id  — onboarding prefill
export const fetchUserById = (id) =>
  api.get(`/users/${id}`).then((r) => r.data);

// GET /user/me
export const fetchUserProfile = () =>
  api.get("/user/me").then((r) => r.data);

// PATCH /user/me  — full update
export const updateUserProfile = (data) =>
  api.patch("/user/me", data).then((r) => r.data);

// PATCH /user/me  — single field update { field: value }
export const patchUserField = (field, value) =>
  api.patch("/user/me", { [field]: value }).then((r) => r.data);

// GET /user/bookings?status=
export const fetchUserBookings = (params = {}) =>
  api.get("/user/bookings", { params }).then((r) => r.data);

// GET /user/saved-providers
export const fetchSavedProviders = () =>
  api.get("/user/saved-providers").then((r) => r.data);
