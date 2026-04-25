import React from "react";
import { X } from "lucide-react";

const ALL_CATEGORIES = [
  "Tutors", "Cleaning", "Technicians", "Fitness",
  "Events", "Security", "Coaching", "Workshops",
  "Plumbing", "Electrical", "Carpentry", "Painting",
];

/**
 * Multi-select tag picker for preferred service categories.
 * In view mode: shows selected tags as read-only pills.
 * In edit mode: shows all options as toggleable chips.
 */
const PreferencesTags = ({ selected = [], onChange, editMode }) => {
  const toggle = (cat) => {
    if (selected.includes(cat)) {
      onChange(selected.filter((c) => c !== cat));
    } else {
      onChange([...selected, cat]);
    }
  };

  if (!editMode) {
    return (
      <div className="flex flex-wrap gap-2">
        {selected.length === 0 ? (
          <p className="text-sm text-slate-300 italic">No preferences set</p>
        ) : (
          selected.map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-full"
            >
              {cat}
            </span>
          ))
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {ALL_CATEGORIES.map((cat) => {
          const active = selected.includes(cat);
          return (
            <button
              key={cat}
              type="button"
              onClick={() => toggle(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                active
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              {cat}
              {active && <X size={10} strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-slate-400">Select all categories you're interested in</p>
    </div>
  );
};

export default PreferencesTags;
