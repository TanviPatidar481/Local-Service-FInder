import { useState, useEffect, useCallback } from "react";
import { fetchUserProfile, patchUserField } from "../services/userService";

/**
 * Reads ONLY user-specific localStorage keys.
 * Never reads businessBasicInfo / businessLocation / businessCategory.
 *
 * Keys:
 *   "userProfile" → written by UserProfileSetup after onboarding
 *   "userData"    → written by UserSignup (fullName, email only)
 */
const getLocalFallback = () => {
  const p    = JSON.parse(localStorage.getItem("userProfile") || "{}");
  const u    = JSON.parse(localStorage.getItem("userData")    || "{}");
  const role = localStorage.getItem("role") || "";
  const isProvider = role === "provider";

  return {
    full_name:     p.name || p.fullName || (!isProvider ? u.fullName : "") || "",
    username:      p.username    || "",
    email:         p.email       || (!isProvider ? u.email : "") || "",
    phone:         p.phone       || "",
    date_of_birth: p.dateOfBirth || "",
    avatar:        p.avatar      || "",
    address:       p.address     || "",
    city:          p.city        || "",
    locality:      p.locality    || "",
    state:         p.state       || "",
    pincode:       p.pincode     || "",
    service_area_radius: p.serviceAreaRadius || "",
    member_since:    p.memberSince    || "",
    total_bookings:  p.totalBookings  || 0,
    saved_providers: p.savedProviders || 0,
  };
};

const syncLocalStorage = (key, value) => {
  const existing = JSON.parse(localStorage.getItem("userProfile") || "{}");
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
      // silent offline fallback
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
