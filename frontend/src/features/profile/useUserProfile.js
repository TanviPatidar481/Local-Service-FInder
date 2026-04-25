/**
 * Lightweight hook for topbar / sidebar — reads display fields only.
 * Reads from "userProfile" (written by UserProfileSetup after onboarding)
 * with fallback to "userData" (written by UserSignup).
 */
export const useUserProfile = () => {
  const p = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const u = JSON.parse(localStorage.getItem("userData")    || "{}");

  return {
    name:   p.name     || p.fullName || u.fullName || "",
    email:  p.email    || u.email    || "",
    phone:  p.phone    || "",
    city:   p.city     || "",
    avatar: p.avatar   || "",
  };
};
