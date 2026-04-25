import React, { useState } from "react";
import { Wrench, Plus, Trash2, Clock, IndianRupee, X } from "lucide-react";
import { SectionCard, EmptySlot } from "./ProfileShared";

const EMPTY_FORM = { name: "", description: "", price: "", duration: "" };

const ServicesSection = ({ services, isOwner, onAdd, onDelete }) => {
  const [showForm, setShowForm] = useState(false);
  const [form,     setForm]     = useState(EMPTY_FORM);

  const handleAdd = () => {
    if (!form.name.trim() || !form.price.trim()) return;
    onAdd(form);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <SectionCard title="Services Offered" isOwner={isOwner} onEdit={() => setShowForm((p) => !p)}>

      {/* Hidden trigger for hero scroll shortcut */}
      {isOwner && <button data-trigger className="hidden" onClick={() => setShowForm(true)} />}

      {/* Add form */}
      {isOwner && showForm && (
        <div className="mb-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">New Service</p>
            <button onClick={() => setShowForm(false)}><X size={14} className="text-slate-400" strokeWidth={2.5} /></button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { key: "name",        placeholder: "Service name *" },
              { key: "price",       placeholder: "Price (₹) *" },
              { key: "duration",    placeholder: "Duration" },
              { key: "description", placeholder: "Short description" },
            ].map(({ key, placeholder }) => (
              <input key={key} placeholder={placeholder} value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium outline-none focus:border-emerald-400 bg-white" />
            ))}
          </div>
          <button onClick={handleAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg hover:bg-emerald-700">
            <Plus size={12} strokeWidth={2.5} /> Add Service
          </button>
        </div>
      )}

      {services.length === 0 ? (
        <EmptySlot icon={Wrench} label="No services listed yet"
          sub={isOwner ? "Click the pencil icon to add your first service" : "This provider hasn't listed services yet"} />
      ) : (
        <div className="divide-y divide-slate-100">
          {services.map((s) => (
            <div key={s.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                {s.description && <p className="text-xs text-slate-500 mt-0.5">{s.description}</p>}
                {s.duration && (
                  <span className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <Clock size={10} strokeWidth={2} /> {s.duration}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 ml-4 flex-shrink-0">
                {s.price && (
                  <span className="flex items-center gap-0.5 text-sm font-extrabold text-emerald-600">
                    <IndianRupee size={12} strokeWidth={2.5} />{s.price}
                  </span>
                )}
                {isOwner ? (
                  <button onClick={() => onDelete(s.id)}
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all">
                    <Trash2 size={13} strokeWidth={2} />
                  </button>
                ) : (
                  <button className="px-4 py-1.5 border-2 border-emerald-600 text-emerald-700 text-xs font-bold rounded-full hover:bg-emerald-50 transition-colors">
                    Book
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
};

export default ServicesSection;
