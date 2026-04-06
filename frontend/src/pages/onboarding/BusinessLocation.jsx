import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessLocation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    address: "",
    pincode: "",
    landmark: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // only essential fields required
  const isFormValid =
    formData.city.trim() !== "" &&
    formData.locality.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // store data
    localStorage.setItem("businessLocation", JSON.stringify(formData));

    // FINAL STEP → go to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 p-4">
      <div className="mx-auto grid h-full w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between bg-slate-900 px-8 py-8 text-white">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400"></span>
              LocalBuddy AI
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
              Step 5 of 5
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Add your service location
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Just tell us the area where you provide your services.
            </p>
          </div>

          <div>
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-full rounded-full bg-orange-400"></div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Your onboarding is almost complete 🚀
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex h-full items-center justify-center px-8 py-6">
          <div className="w-full max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Business Location
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Where do you provide services?
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">

              {/* REQUIRED FIELDS */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Locality <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="locality"
                    placeholder="Enter locality"
                    value={formData.locality}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* OPTIONAL */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Full Address <span className="text-slate-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="address"
                  rows="2"
                  placeholder="Enter full address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Pincode <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Enter pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Landmark <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    placeholder="Enter landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-xl py-3.5 text-white font-semibold transition ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Finish & Go to Dashboard
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BusinessLocation;