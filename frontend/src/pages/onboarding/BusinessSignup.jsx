import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    formData.businessName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.confirmPassword.trim() !== "" &&
    formData.password === formData.confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    localStorage.setItem("businessSignup", JSON.stringify(formData));
    navigate("/onboarding/business-category");
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
          <h1 style={s.heading}>Register your<br/><span style={s.headingGreen}>business</span></h1>
          <p style={s.subtext}>Create your business account and start building a trusted local presence.</p>
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                <rect x="14" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                <rect x="3" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                <rect x="14" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
              </svg>
            </div>
            <p style={s.pillText}>Grow your reach by connecting with local users actively searching for services.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <div style={s.circleDecorRight} />
          <p style={s.tag}>BUSINESS SIGN UP</p>
          <h2 style={s.formTitle}>Create your <span style={s.formTitleGreen}>account</span></h2>
          <p style={s.formSub}>Enter your business details to get started.</p>
          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Business Name <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                  <rect x="14" y="3" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                  <rect x="3" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                  <rect x="14" y="14" width="7" height="7" rx="1" stroke="#2e7d32" strokeWidth="1.8"/>
                </svg>
                <input style={s.input} type="text" name="businessName" placeholder="Enter your business name" value={formData.businessName} onChange={handleChange}/>
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Business Email <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                  <path d="M2 7l10 7 10-7" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input style={s.input} type="email" name="email" placeholder="Enter your business email" value={formData.email} onChange={handleChange}/>
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Password <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input style={s.input} type="password" name="password" placeholder="Create password" value={formData.password} onChange={handleChange}/>
              </div>
            </div>
            <div style={s.field}>
              <label style={s.label}>Confirm Password <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input style={s.input} type="password" name="confirmPassword" placeholder="Re-enter password" value={formData.confirmPassword} onChange={handleChange}/>
              </div>
            </div>
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p style={s.error}>Passwords do not match.</p>
            )}
            <button type="submit" disabled={!isFormValid} style={{ ...s.btn, ...(isFormValid ? {} : s.btnDisabled) }}>
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: { minHeight:"100vh", width:"100vw", backgroundImage:"url('/bg.jpg')", backgroundSize:"cover", backgroundPosition:"center", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI','Inter',Arial,sans-serif", padding:"32px 16px" },
  card: { display:"grid", gridTemplateColumns:"1fr 1.4fr", width:"100%", maxWidth:"960px", background:"rgba(255,255,255,0.92)", borderRadius:"24px", boxShadow:"0 8px 40px rgba(0,0,0,0.10)", overflow:"hidden", minHeight:"520px" },
  left: { padding:"48px 40px", display:"flex", flexDirection:"column", gap:"16px", position:"relative", borderRight:"1px solid #e8f5e9" },
  circleDecor: { position:"absolute", top:"-40px", right:"-40px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(165,214,167,0.18)", pointerEvents:"none" },
  logo: { display:"flex", alignItems:"center", gap:"7px" },
  logoText: { fontSize:"14px", fontWeight:"700", color:"#2e7d32" },
  heading: { fontSize:"34px", fontWeight:"800", color:"#111", lineHeight:1.2, margin:0 },
  headingGreen: { color:"#2e7d32" },
  subtext: { fontSize:"14px", color:"#666", lineHeight:"1.65", margin:0 },
  pill: { display:"flex", alignItems:"flex-start", gap:"12px", background:"#f1f8f1", borderRadius:"12px", padding:"14px 16px" },
  pillIcon: { width:"32px", height:"32px", borderRadius:"8px", background:"#e8f5e9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  pillText: { fontSize:"13px", color:"#555", lineHeight:"1.55", margin:0 },
  right: { padding:"48px 40px", display:"flex", flexDirection:"column", position:"relative" },
  circleDecorRight: { position:"absolute", top:"-40px", right:"-40px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(165,214,167,0.15)", pointerEvents:"none" },
  tag: { fontSize:"11px", fontWeight:"700", letterSpacing:"0.15em", color:"#2e7d32", margin:"0 0 8px" },
  formTitle: { fontSize:"28px", fontWeight:"800", color:"#111", margin:"0 0 6px" },
  formTitleGreen: { color:"#2e7d32" },
  formSub: { fontSize:"13.5px", color:"#777", margin:"0 0 20px" },
  form: { display:"flex", flexDirection:"column", gap:"14px" },
  field: { display:"flex", flexDirection:"column", gap:"5px" },
  label: { fontSize:"13px", fontWeight:"600", color:"#333" },
  req: { color:"#e53935" },
  inputWrap: { display:"flex", alignItems:"center", border:"1px solid #ddd", borderRadius:"10px", padding:"0 14px", gap:"10px", background:"#fff" },
  ico: { flexShrink:0 },
  input: { flex:1, border:"none", outline:"none", padding:"12px 0", fontSize:"14px", color:"#333", background:"transparent" },
  error: { fontSize:"12px", color:"#e53935", margin:0 },
  btn: { marginTop:"6px", width:"100%", padding:"14px", background:"#2e7d32", color:"white", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"600", cursor:"pointer" },
  btnDisabled: { background:"#a5d6a7", cursor:"not-allowed" },
};

export default BusinessSignup;
