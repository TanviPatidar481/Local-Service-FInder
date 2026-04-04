import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileSetup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    pincode: "",
    preferredServices: [],
    language: "",
    budget: "",
  });

  const serviceOptions = [
    "Academic Tutors",
    "Kids Activity Classes",
    "Indoor Sports Coaching",
    "Technicians",
    "Event Organizers",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => {
      const alreadySelected = prev.preferredServices.includes(service);

      return {
        ...prev,
        preferredServices: alreadySelected
          ? prev.preferredServices.filter((item) => item !== service)
          : [...prev.preferredServices, service],
      };
    });
  };

  const isFormValid =
  formData.city.trim() !== "" &&
  formData.locality.trim() !== "" &&
  formData.pincode.trim() !== "" &&
  formData.language.trim() !== "" &&
  formData.preferredServices.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    localStorage.setItem("userProfileSetup", JSON.stringify(formData));
    alert("User profile setup completed successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 px-4 py-8 md:px-8">
      <div className="mx-auto grid min-h-[90vh] w-full max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <div className="flex flex-col justify-between bg-slate-900 px-8 py-10 text-white md:px-12 md:py-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400"></span>
              LocalBuddy AI
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight md:text-5xl">
              Complete your profile
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              Add a few details so we can show better nearby service
              recommendations based on your location and preferences.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">
                Required fields must be filled before you can continue.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">
                You can select multiple preferred services for better matching.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 md:px-12">
          <div className="w-full max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              User Profile Setup
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Tell us a little more
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              This helps LocalBuddy AI personalize your service search
              experience.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Enter your city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Locality / Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="locality"
                  placeholder="Enter your locality"
                  value={formData.locality}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="Enter pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Preferred Services <span className="text-red-500">*</span>
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {serviceOptions.map((service) => {
                    const selected = formData.preferredServices.includes(service);

                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => handleServiceToggle(service)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          selected
                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                            : "border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>

                {formData.preferredServices.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {formData.preferredServices.map((service) => (
                      <span
                        key={service}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Preferred Language <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="language"
                  placeholder="Enter preferred language"
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Budget Range 
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Enter your budget range"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-2xl py-3.5 text-white font-semibold transition ${
                  isFormValid
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Save and Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSetup;