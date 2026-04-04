import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid =
    formData.businessName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    navigate("/onboarding/business-verify-email", {
    state: {
    email: formData.email,
  },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 px-4 py-8 md:px-8">
      <div className="mx-auto grid min-h-[90vh] w-full max-w-7xl overflow-hidden rounded-[32px] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)] md:grid-cols-2">
        
        <div className="bg-slate-900 px-8 py-10 text-white md:px-12 md:py-12 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400"></span>
              LocalBuddy AI
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-tight md:text-5xl">
              Register your business
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              Create your business account and start building a trusted local
              presence for users actively searching nearby.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <p className="text-sm text-slate-300">
                Ideal for tutors, activity classes, technicians, sports coaches, and event providers.
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 p-4 border border-white/10">
              <p className="text-sm text-slate-300">
                Verified signup improves trust and helps genuine providers stand out.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 md:px-12">
          <div className="w-full max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              Business Sign Up
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Get listed on LocalBuddy AI
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Register your business and start reaching nearby users looking for your services.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Business Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your business email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                />
              </div>

              {formData.confirmPassword &&
                formData.password !== formData.confirmPassword && (
                  <p className="text-sm text-red-500">
                    Passwords do not match.
                  </p>
                )}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full rounded-2xl py-3.5 text-base font-semibold text-white transition ${
                  isFormValid
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Continue
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-500">
              Already registered?{" "}
              <span className="font-medium text-orange-500">Log in</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSignup;