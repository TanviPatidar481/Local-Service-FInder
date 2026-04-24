import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessLocation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: "", locality: "", address: "", pincode: "", landmark: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid = formData.city.trim() !== "" && formData.locality.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    localStorage.setItem("businessLocation", JSON.stringify(formData));
    navigate("/provider/overview");
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
          <p style={s.step}>STEP 5 OF 5</p>
          <h1 style={s.heading}>Service<br/><span style={s.headingGreen}>location</span></h1>
          <p style={s.subtext}>Just tell us the area where you provide your services.</p>
          <div style={s.progressBg}><div style={{ ...s.progressFill, width:"100%" }} /></div>
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#2e7d32" strokeWidth="1.8"/>
                <circle cx="12" cy="9" r="2.5" stroke="#2e7d32" strokeWidth="1.5"/>
              </svg>
            </div>
            <p style={s.pillText}>Your onboarding is almost complete 🚀</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <div style={s.circleDecorRight} />
          <p style={s.tag}>BUSINESS LOCATION</p>
          <h2 style={s.formTitle}>Where do you <span style={s.formTitleGreen}>provide services?</span></h2>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>City <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/></svg>
                  <input style={s.input} type="text" name="city" placeholder="Enter city" value={formData.city} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Locality <span style={s.req}>*</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#2e7d32" strokeWidth="1.8"/><circle cx="12" cy="9" r="2.5" stroke="#2e7d32" strokeWidth="1.5"/></svg>
                  <input style={s.input} type="text" name="locality" placeholder="Enter locality" value={formData.locality} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Full Address <span style={s.opt}>(Optional)</span></label>
              <textarea style={{ ...s.input, border:"1px solid #ddd", borderRadius:"10px", padding:"10px 14px", resize:"vertical", minHeight:"70px" }} name="address" placeholder="Enter full address" value={formData.address} onChange={handleChange}/>
            </div>
            <div style={s.row2}>
              <div style={s.field}>
                <label style={s.label}>Pincode <span style={s.opt}>(Optional)</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#2e7d32" strokeWidth="1.8"/><circle cx="12" cy="9" r="2.5" stroke="#2e7d32" strokeWidth="1.5"/></svg>
                  <input style={s.input} type="text" name="pincode" placeholder="Enter pincode" value={formData.pincode} onChange={handleChange}/>
                </div>
              </div>
              <div style={s.field}>
                <label style={s.label}>Landmark <span style={s.opt}>(Optional)</span></label>
                <div style={s.inputWrap}>
                  <svg style={s.ico} width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 12h18M12 3l9 9-9 9-9-9 9-9z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/></svg>
                  <input style={s.input} type="text" name="landmark" placeholder="Enter landmark" value={formData.landmark} onChange={handleChange}/>
                </div>
              </div>
            </div>
            <button type="submit" disabled={!isFormValid} style={{ ...s.btn, ...(isFormValid ? {} : s.btnDisabled) }}>
              Finish & Go to Dashboard
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

export default BusinessLocation;
