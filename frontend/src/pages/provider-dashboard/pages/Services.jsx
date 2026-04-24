import React, { useState } from "react";
import { Plus, X, Wrench } from "lucide-react";
import ServiceCard from "../components/ServiceCard";

// TODO: replace with:
// GET  /provider/services        → fetch services list
// POST /provider/services        → add service
// DELETE /provider/services/:id  → delete service

const EMPTY_FORM = { name: "", description: "", price: "", duration: "" };

const Services = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm]         = useState(EMPTY_FORM);

  const handleAdd = () => {
    if (!form.name.trim() || !form.price.trim()) return;
    setServices((p) => [...p, { id: Date.now(), ...form }]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  return (
    <div className="space-y-5 provider-dash">

      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">My Services</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">{services.length} service{services.length !== 1 ? "s" : ""} listed</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
        >
          {showForm ? <X size={14} strokeWidth={2.5} /> : <Plus size={14} strokeWidth={2.5} />}
          {showForm ? "Cancel" : "Add Service"}
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm space-y-4">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">New Service</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { key: "name",        placeholder: "Service name *" },
              { key: "price",       placeholder: "Price (₹) *" },
              { key: "duration",    placeholder: "Duration (e.g. 1 hour)" },
              { key: "description", placeholder: "Short description" },
            ].map(({ key, placeholder }) => (
              <input
                key={key}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-100 transition-all"
              />
            ))}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            <Plus size={13} strokeWidth={2.5} /> Save Service
          </button>
        </div>
      )}

      {/* Empty state or grid */}
      {services.length === 0 ? (
        <div className="bg-white rounded-2xl p-14 text-center border border-slate-100 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
            <Wrench size={24} className="text-slate-300" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-slate-500">No services listed yet</p>
          <p className="text-xs text-slate-400 mt-1">Add your first service to start receiving bookings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onDelete={(svc) => setServices((p) => p.filter((x) => x.id !== svc.id))}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
