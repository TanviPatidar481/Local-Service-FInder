import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfileSetup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    preferredServices: [],
    pincode: "",
    language: "",
    budget: "",
  });

  const servicesList = [
    "Tutor",
    "Kids Activity",
    "Sports Coach",
    "Technician",
    "Event Organizer",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      preferredServices: prev.preferredServices.includes(service)
        ? prev.preferredServices.filter((s) => s !== service)
        : [...prev.preferredServices, service],
    }));
  };

  const isFormValid =
    formData.city.trim() !== "" &&
    formData.locality.trim() !== "" &&
    formData.preferredServices.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    localStorage.setItem("userProfile", JSON.stringify(formData));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 p-4">
      <div className="mx-auto grid h-full w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <div className="flex flex-col justify-between bg-slate-900 px-8 py-8 text-white">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-400"></span>
              LocalBuddy AI
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
              Step 3 of 3
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Complete your profile
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Add a few quick details so we can personalize nearby service recommendations.
            </p>
          </div>

          <div>
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-full rounded-full bg-indigo-400"></div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Only city, locality, and preferred services are required.
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center px-8 py-6">
          <div className="w-full max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600">
              User Profile Setup
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Tell us a little more
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="locality"
                    placeholder="Enter locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Preferred Services <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {servicesList.map((service) => {
                    const selected = formData.preferredServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
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
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Pincode <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    name="pincode"
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Language <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    name="language"
                    placeholder="Language"
                    value={formData.language}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Budget <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    name="budget"
                    placeholder="Budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-xl py-3.5 text-white font-semibold transition ${
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