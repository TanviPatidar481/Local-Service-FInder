import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UserVerifyEmail = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");

  const isValid = verificationCode.trim().length === 6;

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!isValid) return;

  alert("User email verified successfully");

  // ✅ FIXED
  navigate("/onboarding/user-profile-setup");
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
              Verify your account
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              We’ve sent a verification code to your email address. Enter the
              code below to complete your signup and start exploring nearby
              local services.
            </p>
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">
                Secure verification helps create trusted user accounts on the platform.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-slate-300">
                Once verified, users can search for tutors, classes, technicians, and more.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 md:px-12">
          <div className="w-full max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
              User Verification
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              Enter verification code
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Type the 6-digit code sent to your registered email.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <button
                type="submit"
                disabled={!isValid}
                className={`w-full rounded-2xl py-3.5 text-base font-semibold text-white transition ${
                  isValid
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Verify Email
              </button>
            </form>

            <button
              type="button"
              className="mt-5 text-sm font-medium text-indigo-600"
            >
              Resend code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserVerifyEmail;