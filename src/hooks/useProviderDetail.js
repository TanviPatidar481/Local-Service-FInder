import { useState, useEffect } from "react";
import { fetchProviderById, fetchProviderReviews } from "../services/providerService";

/**
 * Fetches a single provider's full profile + reviews.
 * @param {string} id
 */
const useProviderDetail = (id) => {
  const [provider, setProvider] = useState(null);
  const [reviews, setReviews]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    Promise.all([fetchProviderById(id), fetchProviderReviews(id)])
      .then(([providerData, reviewsData]) => {
        setProvider(providerData);
        setReviews(reviewsData ?? []);
      })
      .catch((err) => setError(err?.response?.data?.detail || "Failed to load provider"))
      .finally(() => setLoading(false));
  }, [id]);

  return { provider, reviews, loading, error };
};

export default useProviderDetail;
