import React from "react";
import { useNavigate } from "react-router-dom";

const OnboardingChoice = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.wrapper}>



      {/* ── Navbar ── */}
      <nav style={styles.nav}>
        <div style={styles.logo}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2e7d32"/>
            <circle cx="12" cy="9" r="2.5" fill="white"/>
          </svg>
          <span style={styles.logoText}>LocalBuddy</span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>
          LocalBuddy <span style={styles.heroAI}>AI</span>
        </h1>
        <p style={styles.heroSub}>
          Your smart local companion to find trusted nearby services or grow your<br/>
          business visibility with AI-powered recommendations.
        </p>
      </div>

      {/* ── Cards ── */}
      <div style={styles.cards}>

        {/* Find Services */}
        <div style={styles.cardLeft}>
          <div style={styles.greenBlob}/>
          {/* leaf sprig inside card */}
          <svg style={styles.leafSprig} viewBox="0 0 40 90" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,85 C20,60 20,40 20,10" stroke="#81c784" strokeWidth="1.5" fill="none"/>
            <ellipse cx="12" cy="55" rx="12" ry="6" fill="#a5d6a7" fillOpacity="0.8" transform="rotate(-30 12 55)"/>
            <ellipse cx="28" cy="42" rx="11" ry="5" fill="#81c784" fillOpacity="0.8" transform="rotate(25 28 42)"/>
            <ellipse cx="13" cy="30" rx="10" ry="5" fill="#a5d6a7" fillOpacity="0.7" transform="rotate(-20 13 30)"/>
          </svg>

          <div style={styles.iconWrapGreen}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="#2e7d32" strokeWidth="2.2"/>
              <line x1="16.5" y1="16.5" x2="21" y2="21" stroke="#2e7d32" strokeWidth="2.2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 style={styles.cardTitle}>Find Services</h2>
          <p style={styles.cardDesc}>
            Search for tutors, activity classes, indoor sports coaching,
            technicians, and event organizers near you.
          </p>
          <button style={styles.btnGreen}
            onClick={() => navigate("/onboarding/user-signup")}
            onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>
            Sign Up as User &nbsp;→
          </button>
        </div>

        {/* List Business */}
        <div style={styles.cardRight}>
          <div style={styles.orangeBlob}/>
          <div style={styles.iconWrapOrange}>
            {/* store icon */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L4.5 4h15L21 9.5" stroke="#f57c00" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M3 9.5h18v11H3z" stroke="#f57c00" strokeWidth="1.8" strokeLinejoin="round"/>
              <rect x="9" y="13" width="6" height="5" rx="0.5" fill="#f57c00"/>
              <path d="M3 9.5 Q3 12 6 12 Q9 12 9 9.5 Q9 12 12 12 Q15 12 15 9.5 Q15 12 18 12 Q21 12 21 9.5" stroke="#f57c00" strokeWidth="1.5" fill="none"/>
              <text x="9.5" y="9" fontSize="4" fill="#f57c00" fontWeight="bold">24/7</text>
            </svg>
          </div>
          <h2 style={styles.cardTitle}>List Your Business</h2>
          <p style={styles.cardDesc}>
            Register your service and connect with nearby users who are
            actively searching for what you offer.
          </p>
          <button style={styles.btnOrange}
            onClick={() => navigate("/onboarding/business-signup")}
            onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
            onMouseLeave={e => e.currentTarget.style.opacity="1"}>
            Register Business &nbsp;→
          </button>
        </div>
      </div>

      {/* ── Footer tagline ── */}
      <div style={styles.footer}>
        {/* Nodes/scatter icon */}
        <span style={styles.footerItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="5" cy="12" r="2" stroke="#2e7d32" strokeWidth="2"/>
            <circle cx="19" cy="5" r="2" stroke="#2e7d32" strokeWidth="2"/>
            <circle cx="19" cy="19" r="2" stroke="#2e7d32" strokeWidth="2"/>
            <line x1="7" y1="11" x2="17" y2="6" stroke="#2e7d32" strokeWidth="1.8"/>
            <line x1="7" y1="13" x2="17" y2="18" stroke="#2e7d32" strokeWidth="1.8"/>
          </svg>
          AI-powered local discovery
        </span>
        <span style={styles.pipe}>|</span>
        {/* Lightning bolt */}
        <span style={styles.footerItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" fill="#2e7d32"/>
          </svg>
          Faster
        </span>
        <span style={styles.pipe}>|</span>
        {/* Brain icon */}
        <span style={styles.footerItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 3C10.5 3 9.5 3.8 9 5C8 5 6 5.5 6 8C5 8.5 4 9.5 4 11C4 12.5 4.8 13.5 6 14C6 16 7.5 17.5 9 17.8V20H15V17.8C16.5 17.5 18 16 18 14C19.2 13.5 20 12.5 20 11C20 9.5 19 8.5 18 8C18 5.5 16 5 15 5C14.5 3.8 13.5 3 12 3Z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/>
            <line x1="12" y1="3" x2="12" y2="20" stroke="#2e7d32" strokeWidth="1.5"/>
            <path d="M9 8C9 8 10 9 12 9" stroke="#2e7d32" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M9 12C9 12 10 13 12 13" stroke="#2e7d32" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          Smarter
        </span>
        <span style={styles.pipe}>|</span>
        {/* Location pin with circle */}
        <span style={styles.footerItem}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="#2e7d32" strokeWidth="2"/>
            <circle cx="12" cy="9" r="2.5" stroke="#2e7d32" strokeWidth="1.8"/>
          </svg>
          Nearby
        </span>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: "url('/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "'Segoe UI', 'Inter', Arial, sans-serif",
  },
  bgGlow: {
    display: "none",
  },
  citysvg: {
    display: "none",
  },
  plantLeft: {
    display: "none",
  },
  plantRight: {
    display: "none",
  },
  nav: {
    width: "100%",
    padding: "20px 40px",
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  logoText: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1b5e20",
  },
  hero: {
    textAlign: "center",
    marginTop: "20px",
    padding: "0 20px",
    zIndex: 10,
  },
  heroTitle: {
    fontSize: "60px",
    fontWeight: "900",
    color: "#111",
    letterSpacing: "-2px",
    lineHeight: 1.1,
  },
  heroAI: {
    color: "#2e7d32",
  },
  heroSub: {
    marginTop: "14px",
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.75",
    maxWidth: "500px",
    margin: "14px auto 0",
  },
  cards: {
    display: "flex",
    gap: "24px",
    marginTop: "44px",
    zIndex: 10,
    padding: "0 16px",
  },
  cardLeft: {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "44px 36px 36px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(200,230,200,0.6)",
  },
  cardRight: {
    background: "rgba(255,253,250,0.88)",
    backdropFilter: "blur(12px)",
    borderRadius: "24px",
    padding: "44px 36px 36px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
    position: "relative",
    overflow: "hidden",
    border: "1px solid rgba(255,220,180,0.5)",
  },
  greenBlob: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "rgba(165,214,167,0.22)",
    pointerEvents: "none",
  },
  orangeBlob: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "rgba(255,204,128,0.22)",
    pointerEvents: "none",
  },
  leafSprig: {
    position: "absolute",
    bottom: "50px",
    right: "14px",
    width: "40px",
    height: "90px",
    opacity: 0.85,
    pointerEvents: "none",
  },
  iconWrapGreen: {
    width: "68px",
    height: "68px",
    borderRadius: "50%",
    background: "#e8f5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    zIndex: 1,
  },
  iconWrapOrange: {
    width: "68px",
    height: "68px",
    borderRadius: "50%",
    background: "#fff3e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "16px",
    zIndex: 1,
  },
  cardTitle: {
    fontSize: "19px",
    fontWeight: "700",
    color: "#111",
    marginBottom: "10px",
    zIndex: 1,
  },
  cardDesc: {
    fontSize: "13.5px",
    color: "#777",
    lineHeight: "1.65",
    zIndex: 1,
    flexGrow: 1,
  },
  btnGreen: {
    marginTop: "24px",
    width: "100%",
    padding: "14px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: 1,
    transition: "opacity 0.2s",
  },
  btnOrange: {
    marginTop: "24px",
    width: "100%",
    padding: "14px",
    background: "#f57c00",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: 1,
    transition: "opacity 0.2s",
  },
  footer: {
    marginTop: "32px",
    marginBottom: "24px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    fontSize: "13px",
    color: "#2e7d32",
    zIndex: 10,
  },
  footerItem: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  pipe: {
    color: "#bbb",
  },
};

export default OnboardingChoice;
