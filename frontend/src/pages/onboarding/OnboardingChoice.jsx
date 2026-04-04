import React from "react";
import { useNavigate } from "react-router-dom";

const OnboardingChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-orange-50 flex items-center justify-center px-4">
      
      <div className="w-full max-w-5xl text-center">
        
        {/* App Name */}
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
          LocalBuddy <span className="text-indigo-600">AI</span>
        </h1>

        {/* Tagline */}
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-8">
          Your smart local companion to find trusted nearby services or grow your
          business visibility with AI-powered recommendations.
        </p>

        {/* Cards */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          
          {/* USER CARD */}
          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition border border-slate-200">
            <div className="text-4xl mb-4">🔍</div>

            <h2 className="text-2xl font-semibold text-slate-900">
              Find Services
            </h2>

            <p className="mt-3 text-slate-500 leading-7">
              Search for tutors, activity classes, sports coaching,
              technicians, and event organizers near you.
            </p>

            <button
              onClick={() => navigate("/onboarding/user-signup")}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Sign Up as User
            </button>
          </div>

          {/* BUSINESS CARD */}
          <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-xl transition border border-slate-200">
            <div className="text-4xl mb-4">🏪</div>

            <h2 className="text-2xl font-semibold text-slate-900">
              List Your Business
            </h2>

            <p className="mt-3 text-slate-500 leading-7">
              Register your service and connect with nearby users who are actively
              searching for what you offer.
            </p>

            <button
              onClick={() => navigate("/onboarding/business-signup")}
              className="mt-6 w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              Register Business
            </button>
          </div>

        </div>

        {/* Footer Line */}
        <p className="mt-10 text-sm text-slate-400">
          AI-powered local discovery • Faster • Smarter • Nearby
        </p>
      </div>
    </div>
  );
};

export default OnboardingChoice;