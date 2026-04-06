import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessCategory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    {
      id: "tutor",
      title: "Academic Tutor",
      description: "For subject tutors and academic mentors.",
      icon: "📘",
    },
    {
      id: "kids-activity",
      title: "Kids Activity Class",
      description: "For dance, art, music, coding and hobby classes.",
      icon: "🎨",
    },
    {
      id: "sports-coach",
      title: "Indoor Sports Coach",
      description: "For badminton, table tennis, chess and fitness coaching.",
      icon: "🏅",
    },
    {
      id: "technician",
      title: "Technician",
      description: "For electricians, plumbers, repair and service experts.",
      icon: "🔧",
    },
    {
      id: "event-organizer",
      title: "Event Organizer",
      description: "For birthday, wedding and function planners.",
      icon: "🎉",
    },
  ];

  const handleContinue = () => {
    if (!selectedCategory) return;

    localStorage.setItem("businessCategory", selectedCategory);
    navigate("/onboarding/business-basic-info");
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
              Step 1 of 5
            </p>

            <h1 className="mt-3 text-4xl font-bold leading-tight">
              Select your business category
            </h1>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
              Choose the service type you provide so we can guide your onboarding properly.
            </p>
          </div>

          <div>
            <div className="h-2 w-full rounded-full bg-white/10">
              <div className="h-2 w-1/5 rounded-full bg-orange-400"></div>
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              Pick one category to continue to the next step.
            </div>
          </div>
        </div>

        <div className="flex h-full items-center justify-center px-8 py-6">
          <div className="w-full max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
              Business Category
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              What kind of service do you provide?
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Select one category to continue with onboarding.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-4">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      isSelected
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-slate-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                          isSelected ? "bg-orange-100" : "bg-slate-100"
                        }`}
                      >
                        {category.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-base font-semibold text-slate-900">
                            {category.title}
                          </h3>

                          {isSelected && (
                            <span className="rounded-full bg-orange-500 px-2.5 py-1 text-[10px] font-semibold text-white">
                              Selected
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-sm leading-6 text-slate-500">
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
              className={`mt-5 w-full rounded-xl py-3.5 text-white font-semibold transition ${
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