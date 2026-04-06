import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessBasicInfo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    phoneNumber: "",
    alternatePhone: "",
    serviceMode: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid =
    formData.businessName.trim() !== "" &&
    formData.contactPerson.trim() !== "" &&
    formData.phoneNumber.trim() !== "" &&
    formData.serviceMode.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    localStorage.setItem("businessBasicInfo", JSON.stringify(formData));
    navigate("/onboarding/business-location");
  };

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 p-4">
      <div className="mx-auto grid h-full w-full max-w-7xl overflow-hidden rounded-[28px] bg-white shadow-[0_18px_50px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <div className="flex flex-col justify-between bg-slate-900 px-8 py-8 text-white">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400"></span>
              LocalBuddy AI
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
              Step 2 of 5
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Add your basic business details
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Share the core information about your service profile. Keep it
              simple for now.
            </p>
          </div>

          <div>
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-2/5 rounded-full bg-orange-400"></div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Only basic identity and contact details are required.
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center px-8 py-6">
          <div className="w-full max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Business Basic Info
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              Enter your basic details
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    placeholder="Enter business name"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Contact Person <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    placeholder="Enter contact person"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Alternate Phone <span className="text-slate-400 text-xs">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    name="alternatePhone"
                    placeholder="Enter alternate phone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Service Mode <span className="text-red-500">*</span>
                </label>
                <select
                  name="serviceMode"
                  value={formData.serviceMode}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                >
                  <option value="">Select service mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description <span className="text-slate-400 text-xs">(Optional)</span>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  placeholder="Write a short service description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-xl py-3.5 text-white font-semibold transition ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600"
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

export default BusinessBasicInfo;