import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessBasicInfo = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "", contactPerson: "", phoneNumber: "",
    alternatePhone: "", serviceMode: "", description: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    formData.businessName.trim() !== "" &&
    formData.contactPerson.trim() !== "" &&
    formData.phoneNumber.trim() !== "" &&
    formData.serviceMode.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    localStorage.setItem("businessBasicInfo", JSON.stringify(formData));
    navigate("/onboarding/business-location");
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* LEFT */}
        <div style={s.left}>
          <div style={s.circleDecor} />
          <div style={s.logo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2e7d32"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
            <span style={s.logoText}>LocalBuddy AI</span>
          </div>
          <p style={s.step}>STEP 2 OF 5</p>
          <h1 style={s.heading}>Basic business<br/><span style={s.headingGreen}>details</span></h1>
          <p style={s.subtext}>Share the core information about your service profile. Keep it simple for now.</p>
          <div style={s.progressBg}><div style={{ ...s.progressFill, width:"40%" }} /></div>
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={s.pillText}>Only basic identity and contact details are required.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <div style={s.circleDecorRight} />
          <p style={s.tag}>BUSINESS BASIC INFO</p>
          <h2 style={s.formTitle}>Enter your <span style={s.formTitleGreen}>basic details</span></h2>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>Business Name <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/></svg>
                  <input style={s.input} type="text" name="businessName" placeholder="Enter business name" value={formData.businessName} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Contact Person <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#2e7d32" strokeWidth="1.8"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input style={s.input} type="text" name="contactPerson" placeholder="Enter contact person" value={formData.contactPerson} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>Phone Number <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.09 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#2e7d32" strokeWidth="1.8"/></svg>
                  <input style={s.input} type="text" name="phoneNumber" placeholder="Enter phone number" value={formData.phoneNumber} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Alternate Phone <span style={s.opt}>(Optional)</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.09 5.18 2 2 0 015.09 3h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L9.09 10.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="#2e7d32" strokeWidth="1.8"/></svg>
                  <input style={s.input} type="text" name="alternatePhone" placeholder="Enter alternate phone" value={formData.alternatePhone} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Service Mode <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#2e7d32" strokeWidth="1.8"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20" stroke="#2e7d32" strokeWidth="1.5"/></svg>
                <select style={{ ...s.input, cursor:"pointer" }} name="serviceMode" value={formData.serviceMode} onChange={handleChange}>
                  <option value="">Select service mode</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Description <span style={s.opt}>(Optional)</span></label>
              <textarea style={{ ...s.input, border:"1px solid #ddd", borderRadius:"10px", padding:"10px 14px", resize:"vertical", minHeight:"80px" }} name="description" placeholder="Write a short service description" value={formData.description} onChange={handleChange}/>
            </div>
            <button type="submit" disabled={!isFormValid} style={{ ...s.btn, ...(isFormValid ? {} : s.btnDisabled) }}>
              Save and Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: { minHeight:"100vh", width:"100vw", backgroundImage:"url('/bg.jpg')", backgroundSize:"cover", backgroundPosition:"center", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI','Inter',Arial,sans-serif", padding:"24px 16px" },
  card: { display:"grid", gridTemplateColumns:"1fr 1.4fr", width:"100%", maxWidth:"960px", background:"rgba(255,255,255,0.92)", borderRadius:"24px", boxShadow:"0 8px 40px rgba(0,0,0,0.10)", overflow:"hidden", minHeight:"520px" },
  left: { padding:"48px 40px", display:"flex", flexDirection:"column", gap:"14px", position:"relative", borderRight:"1px solid #e8f5e9" },
  circleDecor: { position:"absolute", top:"-40px", right:"-40px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(165,214,167,0.18)", pointerEvents:"none" },
  logo: { display:"flex", alignItems:"center", gap:"7px" },
  logoText: { fontSize:"14px", fontWeight:"700", color:"#2e7d32" },
  step: { fontSize:"11px", fontWeight:"700", letterSpacing:"0.15em", color:"#2e7d32", margin:0 },
  heading: { fontSize:"34px", fontWeight:"800", color:"#111", lineHeight:1.2, margin:0 },
  headingGreen: { color:"#2e7d32" },
  subtext: { fontSize:"14px", color:"#666", lineHeight:"1.65", margin:0 },
  progressBg: { height:"6px", borderRadius:"99px", background:"#e0e0e0" },
  progressFill: { height:"6px", borderRadius:"99px", background:"#2e7d32" },
  pill: { display:"flex", alignItems:"flex-start", gap:"12px", background:"#f1f8f1", borderRadius:"12px", padding:"14px 16px" },
  pillIcon: { width:"32px", height:"32px", borderRadius:"8px", background:"#e8f5e9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  pillText: { fontSize:"13px", color:"#555", lineHeight:"1.55", margin:0 },
  right: { padding:"40px", display:"flex", flexDirection:"column", position:"relative" },
  circleDecorRight: { position:"absolute", top:"-40px", right:"-40px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(165,214,167,0.15)", pointerEvents:"none" },
  tag: { fontSize:"11px", fontWeight:"700", letterSpacing:"0.15em", color:"#2e7d32", margin:"0 0 6px" },
  formTitle: { fontSize:"26px", fontWeight:"800", color:"#111", margin:"0 0 16px" },
  formTitleGreen: { color:"#2e7d32" },
  form: { display:"flex", flexDirection:"column", gap:"12px" },
  row2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" },
  field: { display:"flex", flexDirection:"column", gap:"5px" },
  label: { fontSize:"13px", fontWeight:"600", color:"#333" },
  req: { color:"#e53935" },
  opt: { fontSize:"11px", color:"#999", fontWeight:"400" },
  inputWrap: { display:"flex", alignItems:"center", border:"1px solid #ddd", borderRadius:"10px", padding:"0 12px", gap:"8px", background:"#fff" },
  ico: { flexShrink:0 },
  input: { flex:1, border:"none", outline:"none", padding:"10px 0", fontSize:"13.5px", color:"#333", background:"transparent" },
  btn: { width:"100%", padding:"14px", background:"#2e7d32", color:"white", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"600", cursor:"pointer", marginTop:"4px" },
  btnDisabled: { background:"#a5d6a7", cursor:"not-allowed" },
};

export default BusinessBasicInfo;
