import { useState } from "react";

/**
 * Loads and manages profile data for /provider/:id
 * TODO: replace with GET/PATCH /provider/:id when backend is ready.
 */
export const useProfileData = () => {
  const basic    = JSON.parse(localStorage.getItem("businessBasicInfo") || "{}");
  const location = JSON.parse(localStorage.getItem("businessLocation")  || "{}");
  const category = JSON.parse(localStorage.getItem("businessCategory")  || "{}");

  const [profile, setProfile] = useState({
    businessName:  basic.businessName  || "",
    contactPerson: basic.contactPerson || "",
    serviceMode:   basic.serviceMode   || "",
    description:   basic.description   || "",
    city:          location.city       || "",
    locality:      location.locality   || "",
    category:      category.category   || "",
  });

  const [services, setServices] = useState([]);
  const [posts,    setPosts]    = useState([]);

  const saveProfile = (updates) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    localStorage.setItem("businessBasicInfo", JSON.stringify({
      ...basic,
      businessName:  updated.businessName,
      contactPerson: updated.contactPerson,
      serviceMode:   updated.serviceMode,
      description:   updated.description,
    }));
    localStorage.setItem("businessLocation", JSON.stringify({
      ...location,
      city:     updated.city,
      locality: updated.locality,
    }));
    localStorage.setItem("businessCategory", JSON.stringify({ category: updated.category }));
  };

  const addService    = (s)  => setServices((p) => [...p, { id: Date.now(), ...s }]);
  const deleteService = (id) => setServices((p) => p.filter((s) => s.id !== id));
  const addPost       = (p)  => setPosts((prev) => [{ id: Date.now(), createdAt: new Date().toLocaleDateString(), ...p }, ...prev]);

  return { profile, services, posts, saveProfile, addService, deleteService, addPost };
};
