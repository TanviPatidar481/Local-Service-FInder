/**
 * Reads provider profile data from localStorage (populated during onboarding).
 * When the backend has a /provider/me endpoint, replace the localStorage reads
 * with an API call here — the rest of the dashboard won't need to change.
 */
export const useProviderProfile = () => {
  const basic    = JSON.parse(localStorage.getItem("businessBasicInfo") || "null");
  const location = JSON.parse(localStorage.getItem("businessLocation")  || "null");
  const category = JSON.parse(localStorage.getItem("businessCategory")  || "null");

  const fields = [
    basic?.businessName, basic?.contactPerson, basic?.phoneNumber,
    basic?.serviceMode,  location?.city,       location?.locality,
    category?.category,
  ];
  const completionPercent = Math.round((fields.filter(Boolean).length / fields.length) * 100);

  return {
    businessName:   basic?.businessName   || "",
    contactPerson:  basic?.contactPerson  || "",
    phoneNumber:    basic?.phoneNumber    || "",
    alternatePhone: basic?.alternatePhone || "",
    serviceMode:    basic?.serviceMode    || "",
    description:    basic?.description    || "",
    city:           location?.city        || "",
    locality:       location?.locality    || "",
    address:        location?.address     || "",
    pincode:        location?.pincode     || "",
    landmark:       location?.landmark    || "",
    category:       category?.category    || "",
    completionPercent,
  };
};
