import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";

const UserProfileSetup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "",
    locality: "",
    preferredServices: [],
    pincode: "",
    language: "",
    budget: "",
  });

  const servicesList = [
    { label: "Tutor", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/><path d="M2 8v6" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/><path d="M6 10.5v5.5a6 6 0 0012 0v-5.5" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { label: "Kids Activity", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="2" stroke="#2e7d32" strokeWidth="1.8"/><circle cx="15" cy="7" r="2" stroke="#2e7d32" strokeWidth="1.8"/><path d="M5 20v-3a4 4 0 014-4h6a4 4 0 014 4v3" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { label: "Sports Coach", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M13 4L6 12h6l-1 8 7-10h-6l1-6z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { label: "Technician", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l2.3-2.3a6 6 0 01-7.8 7.8l-6.3 6.3a2 2 0 01-2.8-2.8l6.3-6.3a6 6 0 017.8-7.8l-2.5 2.1z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { label: "Event Organizer", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#2e7d32" strokeWidth="1.8"/><line x1="16" y1="2" x2="16" y2="6" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#2e7d32" strokeWidth="1.8"/></svg> },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleService = (service) => {
    setFormData((prev) => ({
      ...prev,
      preferredServices: prev.preferredServices.includes(service)
        ? prev.preferredServices.filter((s) => s !== service)
        : [...prev.preferredServices, service],
    }));
  };

  const isFormValid =
    formData.city.trim() !== "" &&
    formData.locality.trim() !== "" &&
    formData.preferredServices.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    try {
      const userId   = localStorage.getItem("userId");
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");

      const payload = {
        city:        formData.city,
        locality:    formData.locality,
        preferences: formData.preferredServices,
        pincode:     formData.pincode  || null,
        language:    formData.language || null,
        budget:      formData.budget   || null,
      };
      await api.put(`/auth/onboarding/${userId}`, payload);

      // ── Persist merged profile to localStorage so profile page auto-prefills ──
      localStorage.setItem("userProfile", JSON.stringify({
        name:               userData.fullName  || "",
        fullName:           userData.fullName  || "",
        email:              userData.email     || "",
        city:               formData.city,
        locality:           formData.locality,
        pincode:            formData.pincode   || "",
        preferredServices:  formData.preferredServices,
        language:           formData.language  || "",
        budget:             formData.budget    || "",
      }));

      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error:", err);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* ── LEFT PANEL ── */}
        <div style={s.left}>
          <div style={s.circleDecor} />

          <div style={s.logo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2e7d32"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
            <span style={s.logoText}>LocalBuddy AI</span>
          </div>

          <p style={s.step}>STEP 3 OF 3</p>

          <h1 style={s.heading}>
            Complete your<br/>
            <span style={s.headingGreen}>profile</span>
          </h1>

          <p style={s.subtext}>
            Add a few quick details so we can personalize
            nearby service recommendations.
          </p>

          {/* progress bar */}
          <div style={s.progressBg}>
            <div style={s.progressFill} />
          </div>

          {/* pill */}
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={s.pillText}>Only city, locality, and preferred services are required.</p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={s.right}>
          <div style={s.circleDecorRight} />

          <p style={s.tag}>USER PROFILE SETUP</p>
          <h2 style={s.formTitle}>
            Tell us a little <span style={s.formTitleGreen}>more</span>
          </h2>

          <form onSubmit={handleSubmit} style={s.form}>
            {/* City + Locality */}
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>City <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.icoSm} width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="8" height="8" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                    <rect x="13" y="3" width="8" height="8" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                    <rect x="3" y="13" width="8" height="8" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                    <rect x="13" y="13" width="8" height="8" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                  </svg>
                  <input style={s.input} name="city" placeholder="Enter city" value={formData.city} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Locality <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.icoSm} width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#2e7d32" strokeWidth="1.8"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#2e7d32" strokeWidth="1.5"/>
                  </svg>
                  <input style={s.input} name="locality" placeholder="Enter locality" value={formData.locality} onChange={handleChange}/>
                </div>
              </div>
            </div>

            {/* Preferred Services */}
            <div style={s.field}>
              <label style={s.label}>Preferred Services <span style={s.req}>*</span></label>
              <div style={s.servicesGrid}>
                {servicesList.map(({ label, icon }) => {
                  const selected = formData.preferredServices.includes(label);
                  return (
                    <button key={label} type="button" onClick={() => toggleService(label)}
                      style={{ ...s.serviceBtn, ...(selected ? s.serviceBtnActive : {}) }}>
                      <span style={s.serviceIcon}>{icon}</span>
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pincode / Language / Budget */}
            <div style={s.row3}>
              <div style={s.field}>
                <label style={s.label}>Pincode <span style={s.opt}>(Optional)</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.icoSm} width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#2e7d32" strokeWidth="1.8"/>
                    <circle cx="12" cy="9" r="2.5" stroke="#2e7d32" strokeWidth="1.5"/>
                  </svg>
                  <input style={s.input} name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Language <span style={s.opt}>(Optional)</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.icoSm} width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#2e7d32" strokeWidth="1.8"/>
                    <path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="#2e7d32" strokeWidth="1.5"/>
                  </svg>
                  <input style={s.input} name="language" placeholder="Language" value={formData.language} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Budget <span style={s.opt}>(Optional)</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.icoSm} width="15" height="15" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="6" width="20" height="14" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                    <path d="M2 10h20" stroke="#2e7d32" strokeWidth="1.8"/>
                  </svg>
                  <input style={s.input} name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange}/>
                </div>
              </div>
            </div>

            <button type="submit" disabled={!isFormValid}
              style={{ ...s.btn, ...(isFormValid ? {} : s.btnDisabled) }}>
              Save and Continue
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

const s = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', 'Inter', Arial, sans-serif",
    padding: "24px 16px",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    width: "100%",
    maxWidth: "960px",
    background: "rgba(255,255,255,0.93)",
    borderRadius: "24px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    overflow: "hidden",
    minHeight: "520px",
  },
  left: {
    padding: "44px 36px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "relative",
    borderRight: "1px solid #e8f5e9",
  },
  circleDecor: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "rgba(165,214,167,0.18)",
    pointerEvents: "none",
  },
  logo: { display: "flex", alignItems: "center", gap: "7px" },
  logoText: { fontSize: "14px", fontWeight: "700", color: "#2e7d32" },
  step: { fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", color: "#2e7d32", margin: 0 },
  heading: { fontSize: "32px", fontWeight: "800", color: "#111", lineHeight: 1.2, margin: 0 },
  headingGreen: { color: "#2e7d32" },
  subtext: { fontSize: "13.5px", color: "#666", lineHeight: "1.65", margin: 0 },
  progressBg: { height: "6px", borderRadius: "99px", background: "#e0e0e0", marginTop: "4px" },
  progressFill: { height: "6px", borderRadius: "99px", background: "#2e7d32", width: "100%" },
  pill: {
    display: "flex", alignItems: "flex-start", gap: "12px",
    background: "#f1f8f1", borderRadius: "12px", padding: "14px 16px",
  },
  pillIcon: {
    width: "32px", height: "32px", borderRadius: "8px", background: "#e8f5e9",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  pillText: { fontSize: "13px", color: "#555", lineHeight: "1.55", margin: 0 },
  right: { padding: "44px 40px", display: "flex", flexDirection: "column", position: "relative" },
  circleDecorRight: {
    position: "absolute", top: "-40px", right: "-40px",
    width: "130px", height: "130px", borderRadius: "50%",
    background: "rgba(165,214,167,0.15)", pointerEvents: "none",
  },
  tag: { fontSize: "11px", fontWeight: "700", letterSpacing: "0.15em", color: "#2e7d32", margin: "0 0 6px" },
  formTitle: { fontSize: "26px", fontWeight: "800", color: "#111", margin: "0 0 16px" },
  formTitleGreen: { color: "#2e7d32" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" },
  field: { display: "flex", flexDirection: "column", gap: "5px" },
  label: { fontSize: "13px", fontWeight: "600", color: "#333" },
  req: { color: "#e53935" },
  opt: { fontSize: "11px", color: "#999", fontWeight: "400" },
  inputWrap: {
    display: "flex", alignItems: "center",
    border: "1px solid #ddd", borderRadius: "10px",
    padding: "0 12px", gap: "8px", background: "#fff",
  },
  icoSm: { flexShrink: 0 },
  input: {
    flex: 1, border: "none", outline: "none",
    padding: "10px 0", fontSize: "13.5px", color: "#333", background: "transparent",
  },
  servicesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  serviceBtn: {
    display: "flex", alignItems: "center", gap: "8px",
    border: "1px solid #ddd", borderRadius: "10px",
    padding: "10px 14px", background: "#fff",
    fontSize: "13.5px", color: "#444", fontWeight: "500",
    cursor: "pointer", textAlign: "left",
  },
  serviceBtnActive: {
    border: "1.5px solid #2e7d32", background: "#f1f8f1", color: "#2e7d32",
  },
  serviceIcon: { display: "flex", alignItems: "center" },
  btn: {
    width: "100%", padding: "14px", background: "#2e7d32",
    color: "white", border: "none", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600", cursor: "pointer", marginTop: "4px",
  },
  btnDisabled: { background: "#a5d6a7", cursor: "not-allowed" },
};

export default UserProfileSetup;
