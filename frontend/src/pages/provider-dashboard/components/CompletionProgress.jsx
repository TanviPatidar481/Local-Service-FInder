import React from "react";
import { CheckCircle2 } from "lucide-react";

const CompletionProgress = ({ percent = 0 }) => (
  <div>
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={12} className="text-emerald-500" strokeWidth={2.5} />
        <span className="text-[11px] font-bold text-slate-600">Profile Completion</span>
      </div>
      <span className="text-[11px] font-extrabold text-emerald-600">{percent}%</span>
    </div>
    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-emerald-400 to-green-500 rounded-full transition-all duration-700"
        style={{ width: `${percent}%` }}
      />
    </div>
  </div>
);

export default CompletionProgress;
