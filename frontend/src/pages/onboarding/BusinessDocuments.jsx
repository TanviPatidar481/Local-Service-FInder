import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessDocuments = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    idProof: "",
    addressProof: "",
    certificateProof: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid =
    formData.idProof.trim() !== "" &&
    formData.addressProof.trim() !== "" &&
    formData.certificateProof.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    localStorage.setItem("businessDocuments", JSON.stringify(formData));
    alert("Business onboarding completed successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 px-4 py-8 md:px-8">
      <div className="mx-auto grid min-h-[90vh] w-full max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:grid-cols-2">
        <div className="flex flex-col justify-between bg-slate-900 px-8 py-10 text-white md:px-12 md:py-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400"></span>
              LocalBuddy AI
            </div>

            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-orange-300">
              Step 4 of 4
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Upload verification details
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              Add your key verification details to improve trust and complete
              your business onboarding.
            </p>
          </div>

          <div className="mt-10">
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-full rounded-full bg-orange-400"></div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">
                  Required verification fields must be filled before submission.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">
                  Later you can replace these with real file uploads and backend verification.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 md:px-12">
          <div className="w-full max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              Business Documents
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Enter your verification details
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              These are placeholder inputs for now since you are building frontend first.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  ID Proof <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="idProof"
                  placeholder="Enter ID proof name"
                  value={formData.idProof}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address Proof <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="addressProof"
                  placeholder="Enter address proof name"
                  value={formData.addressProof}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Qualification / Service Proof <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="certificateProof"
                  placeholder="Enter certificate or proof name"
                  value={formData.certificateProof}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-2xl py-3.5 text-white font-semibold transition ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "bg-slate-300 cursor-not-allowed"
                }`}
              >
                Submit Business Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDocuments;