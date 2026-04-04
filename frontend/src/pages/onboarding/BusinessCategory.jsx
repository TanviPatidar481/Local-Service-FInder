import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessCategory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    {
      id: "tutor",
      title: "Academic Tutor",
      description:
        "For subject tutors, home tutors, coaching instructors, and academic mentors.",
      icon: "📘",
    },
    {
      id: "kids-activity",
      title: "Kids Activity Class",
      description:
        "For dance, art, music, abacus, coding, handwriting, and other kids learning activities.",
      icon: "🎨",
    },
    {
      id: "sports-coach",
      title: "Indoor Sports Coach",
      description:
        "For badminton, table tennis, chess, skating, fitness, and indoor sports coaching providers.",
      icon: "🏅",
    },
    {
      id: "technician",
      title: "Technician",
      description:
        "For electricians, plumbers, appliance repair, laptop/mobile repair, AC service, and similar services.",
      icon: "🔧",
    },
    {
      id: "event-organizer",
      title: "Event Organizer",
      description:
        "For birthday planners, decorators, wedding services, and other event management providers.",
      icon: "🎉",
    },
  ];

  const handleContinue = () => {
    if (!selectedCategory) return;

    localStorage.setItem("businessCategory", selectedCategory);
    navigate("/onboarding/business-basic-info");
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
              Step 1 of 5
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
              Select your business category
            </h1>

            <p className="mt-5 max-w-lg text-base leading-8 text-slate-300">
              Choose the type of service you provide so we can collect the right
              details and verification information for your listing.
            </p>
          </div>

          <div className="mt-10">
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-1/5 rounded-full bg-orange-400"></div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">
                  Category selection decides the business details and documents
                  required in the next steps.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-slate-300">
                  You can keep this specific so your profile reaches the right users.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white px-6 py-10 md:px-12">
          <div className="w-full max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-orange-500">
              Business Category
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">
              What kind of service do you provide?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-500">
              Select one category to continue with category-specific onboarding.
            </p>

            <div className="mt-8 space-y-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full rounded-2xl border p-5 text-left transition ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                          isSelected ? "bg-orange-100" : "bg-slate-100"
                        }`}
                      >
                        {category.icon}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">
                            {category.title}
                          </h3>

                          {isSelected && (
                            <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                              Selected
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedCategory}
              className={`mt-8 w-full rounded-2xl py-3.5 text-base font-semibold text-white transition ${
                selectedCategory
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "cursor-not-allowed bg-slate-300"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCategory;