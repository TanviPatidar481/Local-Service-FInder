import React, { useMemo } from "react";
import { CheckCircle2, Circle } from "lucide-react";

const CHECKS = [
  { key: "full_name",      label: "Full name added"        },
  { key: "avatar",         label: "Profile photo uploaded" },
  { key: "phone",          label: "Phone number added"     },
  { key: "city",           label: "City / location set"    },
  { key: "address",        label: "Address added"          },
  { key: "date_of_birth",  label: "Date of birth added"    },
];

const ProfileCompletionCard = ({ profile }) => {
  const completed = useMemo(() => {
    if (!profile) return [];
    return CHECKS.filter(({ key }) => {
      const v = profile[key];
      return Array.isArray(v) ? v.length > 0 : Boolean(v);
    });
  }, [profile]);

  const percent = Math.round((completed.length / CHECKS.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm px-5 py-4 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profile Strength</p>
        <span className="text-sm font-extrabold text-emerald-600">{percent}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {CHECKS.map(({ key, label }) => {
          const done = completed.some((c) => c.key === key);
          return (
            <div key={key} className="flex items-center gap-2">
              {done
                ? <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                : <Circle      size={13} className="text-slate-300 flex-shrink-0"    strokeWidth={2}   />
              }
              <span className={`text-xs font-medium ${done ? "text-slate-600" : "text-slate-400"}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>

      {percent < 100 && (
        <p className="text-[10px] text-slate-400 leading-relaxed border-t border-slate-50 pt-3">
          Complete your profile to get better service matches and faster responses from providers.
        </p>
      )}
    </div>
  );
};

export default ProfileCompletionCard;
