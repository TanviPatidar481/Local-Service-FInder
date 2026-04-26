/**
 * Lightweight hook — reads ONLY user-specific localStorage keys.
 * Never reads businessBasicInfo, businessLocation, or any provider keys.
 *
 * Keys written by user onboarding:
 *   "userProfile" → { name, fullName, email, phone, city, locality, avatar, ... }
 *   "userData"    → { fullName, email }  (signup step, before profile setup)
 */
export const useUserProfile = () => {
  const p = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const u = JSON.parse(localStorage.getItem("userData")    || "{}");

  // Only use userData as fallback if role is NOT provider
  const role = localStorage.getItem("role") || "";
  const isProvider = role === "provider";

  return {
    name:   p.name || p.fullName || (!isProvider ? u.fullName : "") || "",
    email:  p.email || (!isProvider ? u.email : "") || "",
    phone:  p.phone  || "",
    city:   p.city   || "",
    avatar: p.avatar || "",
  };
};
