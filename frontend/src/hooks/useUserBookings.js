import { useState, useEffect, useCallback } from "react";
import { fetchUserBookings } from "../services/userService";

/**
 * Fetches the current user's bookings with optional status filter.
 * @param {string} status - "All" | "Pending" | "Accepted" | "Ongoing" | "Completed" | "Cancelled"
 */
const useUserBookings = (status = "All") => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    const params = status !== "All" ? { status: status.toLowerCase() } : {};
    fetchUserBookings(params)
      .then(setBookings)
      .catch((err) => setError(err?.response?.data?.detail || "Failed to load bookings"))
      .finally(() => setLoading(false));
  }, [status]);

  useEffect(() => { load(); }, [load]);

  return { bookings, loading, error, refetch: load };
};

export default useUserBookings;
