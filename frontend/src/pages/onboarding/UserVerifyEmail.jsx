import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UserVerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "your email";

  const [verificationCode, setVerificationCode] = useState("");

  const isValid = verificationCode.trim().length === 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    alert("User email verified successfully");
    navigate("/onboarding/user-profile-setup");
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        {/* ── LEFT PANEL ── */}
        <div style={s.left}>
          <div style={s.circleDecorLeft} />

          {/* logo */}
          <div style={s.logo}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2e7d32"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
            <span style={s.logoText}>LocalBuddy AI</span>
          </div>

          <h1 style={s.heading}>
            Verify your<br/>
            <span style={s.headingGreen}>account</span>
          </h1>

          <p style={s.subtext}>
            We've sent a verification code to your
            email address. Enter the code below
            to continue.
          </p>

          {/* pills */}
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="4" width="20" height="16" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                <path d="M2 7l10 7 10-7" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </div>
            <p style={s.pillText}>
              Enter the 6-digit code sent to{" "}
              <strong>{email}</strong>
            </p>
          </div>

          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={s.pillText}>This helps us keep your account secure and protected.</p>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div style={s.right}>
          <div style={s.circleDecorRight} />

          <p style={s.tag}>USER VERIFICATION</p>
          <h2 style={s.formTitle}>
            Enter verification <span style={s.formTitleGreen}>code</span>
          </h2>
          <p style={s.formSub}>Type the 6-digit code sent to your registered email.</p>

          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>
                Verification Code <span style={s.req}>*</span>
              </label>
              <div style={s.inputWrap}>
                <svg style={s.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/>
                </svg>
                <input
                  style={s.input}
                  type="text"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid}
              style={{ ...s.btn, ...(isValid ? {} : s.btnDisabled) }}
            >
              Verify Email
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
    padding: "32px 16px",
  },
  card: {
    display: "grid",
    gridTemplateColumns: "1fr 1.4fr",
    width: "100%",
    maxWidth: "960px",
    background: "rgba(255,255,255,0.92)",
    borderRadius: "24px",
    boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
    overflow: "hidden",
    minHeight: "520px",
  },
  left: {
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    position: "relative",
    borderRight: "1px solid #e8f5e9",
  },
  circleDecorLeft: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "rgba(165,214,167,0.18)",
    pointerEvents: "none",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    marginBottom: "8px",
  },
  logoText: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#2e7d32",
  },
  heading: {
    fontSize: "34px",
    fontWeight: "800",
    color: "#111",
    lineHeight: 1.2,
    margin: 0,
  },
  headingGreen: {
    color: "#2e7d32",
  },
  subtext: {
    fontSize: "14px",
    color: "#666",
    lineHeight: "1.65",
    margin: 0,
  },
  pill: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    background: "#f1f8f1",
    borderRadius: "12px",
    padding: "14px 16px",
  },
  pillIcon: {
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    background: "#e8f5e9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  pillText: {
    fontSize: "13px",
    color: "#555",
    lineHeight: "1.55",
    margin: 0,
  },
  right: {
    padding: "48px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
  },
  circleDecorRight: {
    position: "absolute",
    top: "-40px",
    right: "-40px",
    width: "130px",
    height: "130px",
    borderRadius: "50%",
    background: "rgba(165,214,167,0.15)",
    pointerEvents: "none",
  },
  tag: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.15em",
    color: "#2e7d32",
    margin: "0 0 8px",
  },
  formTitle: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#111",
    margin: "0 0 6px",
  },
  formTitleGreen: {
    color: "#2e7d32",
  },
  formSub: {
    fontSize: "13.5px",
    color: "#777",
    margin: "0 0 24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#333",
  },
  req: {
    color: "#e53935",
  },
  inputWrap: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "0 14px",
    gap: "10px",
    background: "#fff",
  },
  inputIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: "none",
    outline: "none",
    padding: "12px 0",
    fontSize: "14px",
    color: "#333",
    background: "transparent",
    letterSpacing: "0.1em",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#2e7d32",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  btnDisabled: {
    background: "#a5d6a7",
    cursor: "not-allowed",
  },
};

export default UserVerifyEmail;
