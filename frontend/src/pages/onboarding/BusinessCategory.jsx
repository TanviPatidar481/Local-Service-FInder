import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessCategory = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "tutor", title: "Academic Tutor", description: "For subject tutors and academic mentors.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 3L2 8l10 5 10-5-10-5z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/><path d="M6 10.5v5.5a6 6 0 0012 0v-5.5" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id: "kids-activity", title: "Kids Activity Class", description: "For dance, art, music, coding and hobby classes.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="7" r="2" stroke="#2e7d32" strokeWidth="1.8"/><circle cx="15" cy="7" r="2" stroke="#2e7d32" strokeWidth="1.8"/><path d="M5 20v-3a4 4 0 014-4h6a4 4 0 014 4v3" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id: "sports-coach", title: "Indoor Sports Coach", description: "For badminton, table tennis, chess and fitness coaching.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 4L6 12h6l-1 8 7-10h-6l1-6z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { id: "technician", title: "Technician", description: "For electricians, plumbers, repair and service experts.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l2.3-2.3a6 6 0 01-7.8 7.8l-6.3 6.3a2 2 0 01-2.8-2.8l6.3-6.3a6 6 0 017.8-7.8l-2.5 2.1z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/></svg> },
    { id: "event-organizer", title: "Event Organizer", description: "For birthday, wedding and function planners.", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="#2e7d32" strokeWidth="1.8"/><line x1="16" y1="2" x2="16" y2="6" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/><line x1="8" y1="2" x2="8" y2="6" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="10" x2="21" y2="10" stroke="#2e7d32" strokeWidth="1.8"/></svg> },
  ];

  const handleContinue = () => {
    if (!selectedCategory) return;
    localStorage.setItem("businessCategory", JSON.stringify({ category: selectedCategory }));
    navigate("/onboarding/business-basic-info");
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
          <p style={s.step}>STEP 1 OF 5</p>
          <h1 style={s.heading}>Select your<br/><span style={s.headingGreen}>category</span></h1>
          <p style={s.subtext}>Choose the service type you provide so we can guide your onboarding properly.</p>
          <div style={s.progressBg}><div style={{ ...s.progressFill, width:"20%" }} /></div>
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="#2e7d32" strokeWidth="1.8"/>
                <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <p style={s.pillText}>Pick one category to continue to the next step.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <div style={s.circleDecorRight} />
          <p style={s.tag}>BUSINESS CATEGORY</p>
          <h2 style={s.formTitle}>What kind of service do <span style={s.formTitleGreen}>you provide?</span></h2>
          <p style={s.formSub}>Select one category to continue with onboarding.</p>
          <div style={s.grid}>
            {categories.map(({ id, title, description, icon }) => {
              const selected = selectedCategory === id;
              return (
                <button key={id} type="button" onClick={() => setSelectedCategory(id)}
                  style={{ ...s.catBtn, ...(selected ? s.catBtnActive : {}) }}>
                  <div style={{ ...s.catIcon, ...(selected ? s.catIconActive : {}) }}>{icon}</div>
                  <div style={s.catText}>
                    <div style={s.catTitle}>{title}{selected && <span style={s.badge}>Selected</span>}</div>
                    <div style={s.catDesc}>{description}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={handleContinue} disabled={!selectedCategory}
            style={{ ...s.btn, ...(selectedCategory ? {} : s.btnDisabled) }}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: { minHeight:"100vh", width:"100vw", backgroundImage:"url('/bg.jpg')", backgroundSize:"cover", backgroundPosition:"center", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI','Inter',Arial,sans-serif", padding:"32px 16px" },
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
  formTitle: { fontSize:"24px", fontWeight:"800", color:"#111", margin:"0 0 4px" },
  formTitleGreen: { color:"#2e7d32" },
  formSub: { fontSize:"13px", color:"#777", margin:"0 0 16px" },
  grid: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"16px" },
  catBtn: { display:"flex", alignItems:"flex-start", gap:"10px", border:"1px solid #ddd", borderRadius:"12px", padding:"12px", background:"#fff", cursor:"pointer", textAlign:"left" },
  catBtnActive: { border:"1.5px solid #2e7d32", background:"#f1f8f1" },
  catIcon: { width:"40px", height:"40px", borderRadius:"10px", background:"#f5f5f5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  catIconActive: { background:"#e8f5e9" },
  catText: { flex:1 },
  catTitle: { fontSize:"13.5px", fontWeight:"700", color:"#111", display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" },
  catDesc: { fontSize:"12px", color:"#777", marginTop:"3px", lineHeight:"1.5" },
  badge: { fontSize:"10px", background:"#2e7d32", color:"white", borderRadius:"99px", padding:"2px 8px", fontWeight:"600" },
  btn: { width:"100%", padding:"14px", background:"#2e7d32", color:"white", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"600", cursor:"pointer" },
  btnDisabled: { background:"#a5d6a7", cursor:"not-allowed" },
};

export default BusinessCategory;
