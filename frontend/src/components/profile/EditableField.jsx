import React, { useState, useRef, useEffect } from "react";
import { Pencil, Check, X, Loader2 } from "lucide-react";

/**
 * Self-contained inline-edit field.
 * - View mode: shows value + pencil icon on hover
 * - Edit mode: input + save/cancel buttons
 * - onSave(value) → async, receives new value
 */
const EditableField = ({
  label,
  fieldKey,
  value,
  onSave,
  icon: Icon,
  type = "text",
  placeholder = "—",
  readOnly = false,
  as = "input",
}) => {
  const [editing, setEditing]   = useState(false);
  const [draft,   setDraft]     = useState(value ?? "");
  const [saving,  setSaving]    = useState(false);
  const [flash,   setFlash]     = useState(null); // "ok" | "err"
  const inputRef = useRef();

  // Keep draft in sync if parent value changes (e.g. after refetch)
  useEffect(() => {
    if (!editing) setDraft(value ?? "");
  }, [value, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const handleEdit = () => {
    setDraft(value ?? "");
    setEditing(true);
  };

  const handleCancel = () => {
    setDraft(value ?? "");
    setEditing(false);
  };

  const handleSave = async () => {
    if (draft === value) { setEditing(false); return; }
    setSaving(true);
    const result = await onSave(fieldKey, draft);
    setSaving(false);
    setEditing(false);
    setFlash(result?.ok ? "ok" : "err");
    setTimeout(() => setFlash(null), 2000);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && as !== "textarea") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const displayValue = value || "";

  return (
    <div className="group">
      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
        {label}
        {readOnly && (
          <span className="ml-2 text-[9px] font-semibold text-slate-300 normal-case tracking-normal">read-only</span>
        )}
      </label>

      {editing ? (
        <div className="flex items-start gap-2">
          <div className="flex-1 flex items-start gap-2 border border-emerald-400 ring-1 ring-emerald-100 rounded-xl px-3 py-2.5 bg-white transition-all">
            {Icon && <Icon size={14} className="text-slate-400 flex-shrink-0 mt-0.5" strokeWidth={2} />}
            {as === "textarea" ? (
              <textarea
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                rows={3}
                className="flex-1 text-sm font-medium text-slate-700 outline-none bg-transparent placeholder-slate-300 resize-none"
              />
            ) : (
              <input
                ref={inputRef}
                type={type}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 text-sm font-medium text-slate-700 outline-none bg-transparent placeholder-slate-300"
              />
            )}
          </div>
          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors flex-shrink-0 disabled:opacity-60 mt-0.5"
          >
            {saving
              ? <Loader2 size={13} className="animate-spin" strokeWidth={2.5} />
              : <Check size={13} strokeWidth={2.5} />}
          </button>
          {/* Cancel */}
          <button
            onClick={handleCancel}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors flex-shrink-0 mt-0.5"
          >
            <X size={13} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <div
          className={`flex items-center gap-2 min-h-[38px] px-3 py-2 rounded-xl border transition-all ${
            readOnly
              ? "border-transparent bg-slate-50/60"
              : "border-transparent hover:border-slate-200 hover:bg-slate-50 cursor-pointer"
          } ${flash === "ok" ? "border-emerald-200 bg-emerald-50" : ""} ${flash === "err" ? "border-red-200 bg-red-50" : ""}`}
          onClick={!readOnly ? handleEdit : undefined}
        >
          {Icon && (
            <Icon
              size={14}
              className={`flex-shrink-0 ${displayValue ? "text-slate-400" : "text-slate-300"}`}
              strokeWidth={2}
            />
          )}
          <p className={`flex-1 text-sm font-medium leading-relaxed ${displayValue ? "text-slate-700" : "text-slate-300 italic"}`}>
            {displayValue || placeholder}
          </p>
          {!readOnly && (
            <Pencil
              size={12}
              className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              strokeWidth={2.5}
            />
          )}
          {flash === "ok" && <Check size={12} className="text-emerald-500 flex-shrink-0" strokeWidth={2.5} />}
        </div>
      )}
    </div>
  );
};

export default EditableField;
