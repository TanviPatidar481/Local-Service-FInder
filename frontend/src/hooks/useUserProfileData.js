import { useState, useEffect, useCallback } from "react";
import { fetchUserProfile, patchUserField } from "../services/userService";

/**
 * Reads all onboarding-written localStorage keys and maps them
 * to the profile field names used by the profile page.
 *
 * Keys written by onboarding:
 *   "userProfile"  → { name, fullName, email, city, locality, pincode,
 *                       preferredServices, language, budget }
 *   "userData"     → { fullName, email, password, confirmPassword }  (signup step)
 *   "userId"       → string
 */
const getLocalFallback = () => {
  const p = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const u = JSON.parse(localStorage.getItem("userData")    || "{}");

  return {
    // Basic info — prefer userProfile, fall back to userData (signup step)
    full_name:     p.name     || p.fullName || u.fullName || "",
    username:      p.username || "",
    email:         p.email    || u.email    || "",
    phone:         p.phone    || "",
    date_of_birth: p.dateOfBirth || "",
    avatar:        p.avatar   || "",

    // Location — written by UserProfileSetup
    address:             p.address  || "",
    city:                p.city     || "",
    locality:            p.locality || "",
    state:               p.state    || "",
    pincode:             p.pincode  || "",
    service_area_radius: p.serviceAreaRadius || "",

    // Account stats
    member_since:    p.memberSince   || "",
    total_bookings:  p.totalBookings  || 0,
    saved_providers: p.savedProviders || 0,
  };
};

const syncLocalStorage = (key, value) => {
  const existing = JSON.parse(localStorage.getItem("userProfile") || "{}");
  // Keep display-name keys in sync for topbar / sidebar reads
  const keyMap = {
    full_name: "name",
    email:     "email",
    phone:     "phone",
    city:      "city",
    avatar:    "avatar",
    locality:  "locality",
    pincode:   "pincode",
  };
  if (keyMap[key]) existing[keyMap[key]] = value;
  existing[key] = value;
  localStorage.setItem("userProfile", JSON.stringify(existing));
};

const useUserProfileData = () => {
  const [profile,     setProfile]     = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [fieldSaving, setFieldSaving] = useState({});

  const load = useCallback(() => {
    setLoading(true);
    fetchUserProfile()
      .then((data) => setProfile({ ...getLocalFallback(), ...data }))
      .catch(() => setProfile(getLocalFallback()))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const saveField = async (key, value) => {
    setFieldSaving((p) => ({ ...p, [key]: true }));
    try {
      await patchUserField(key, value);
    } catch {
      // silent offline fallback — still persist locally
    } finally {
      setProfile((p) => ({ ...p, [key]: value }));
      syncLocalStorage(key, value);
      setFieldSaving((p) => ({ ...p, [key]: false }));
    }
    return { ok: true };
  };

  return { profile, loading, fieldSaving, saveField, refetch: load };
};

export default useUserProfileData;
