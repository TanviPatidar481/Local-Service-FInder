import { useState, useEffect, useCallback } from "react";
import { fetchProviders } from "../services/providerService";

/**
 * Fetches the provider listing with optional filters.
 * @param {{ category?: string, q?: string, city?: string }} filters
 */
const useProviders = (filters = {}) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    // Strip empty filter values before sending
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v && v !== "All")
    );
    fetchProviders(params)
      .then(setProviders)
      .catch((err) => setError(err?.response?.data?.detail || "Failed to load providers"))
      .finally(() => setLoading(false));
  }, [JSON.stringify(filters)]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { load(); }, [load]);

  return { providers, loading, error, refetch: load };
};

export default useProviders;
