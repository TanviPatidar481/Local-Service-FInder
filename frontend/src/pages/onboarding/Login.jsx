import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";
import socketService from "../../services/socketService";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const isValid = form.email.trim() !== "" && form.password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      const { access_token, user_id, role } = res.data;
      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", user_id);
      localStorage.setItem("role", role);
      if (role === "provider") {
        localStorage.setItem("providerId", user_id);
      }

      // Connect socket immediately after login
      socketService.connect(access_token);

      if (role === "provider") {
        navigate("/provider/overview", { replace: true });
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        {/* LEFT */}
        <div style={s.left}>
          <div style={s.blob} />
          <div style={s.logo}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#2e7d32"/>
              <circle cx="12" cy="9" r="2.5" fill="white"/>
            </svg>
            <span style={s.logoText}>LocalBuddy AI</span>
          </div>
          <h1 style={s.heading}>Welcome<br/><span style={s.green}>back</span></h1>
          <p style={s.sub}>Sign in to continue finding trusted local services or managing your business.</p>
          <div style={s.pill}>
            <div style={s.pillIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#2e7d32" strokeWidth="1.8" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={s.pillText}>Your session is secured with JWT authentication.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={s.right}>
          <div style={s.blobRight} />
          <p style={s.tag}>SIGN IN</p>
          <h2 style={s.formTitle}>Login to your <span style={s.green}>account</span></h2>
          <p style={s.formSub}>Enter your credentials to continue.</p>

          <form onSubmit={handleSubmit} style={s.form}>
            <div style={s.field}>
              <label style={s.label}>Email Address <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="4" width="20" height="16" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                  <path d="M2 7l10 7 10-7" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input style={s.input} type="email" name="email" placeholder="Enter your email"
                  value={form.email} onChange={handleChange} autoComplete="email"/>
              </div>
            </div>

            <div style={s.field}>
              <label style={s.label}>Password <span style={s.req}>*</span></label>
              <div style={s.inputWrap}>
                <svg style={s.ico} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" stroke="#2e7d32" strokeWidth="1.8"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="#2e7d32" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                <input style={s.input} type="password" name="password" placeholder="Enter your password"
                  value={form.password} onChange={handleChange} autoComplete="current-password"/>
              </div>
            </div>

            {error && <p style={s.error}>{error}</p>}

            <button type="submit" disabled={!isValid || loading}
              style={{ ...s.btn, ...(!isValid || loading ? s.btnDisabled : {}) }}>
              {loading ? "Signing in..." : "Sign In →"}
            </button>
          </form>

          <p style={s.bottomText}>
            Don't have an account?{" "}
            <span style={s.link} onClick={() => navigate("/")}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const s = {
  page: { minHeight:"100vh", width:"100vw", backgroundImage:"url('/bg.jpg')", backgroundSize:"cover", backgroundPosition:"center", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Segoe UI','Inter',Arial,sans-serif", padding:"32px 16px" },
  card: { display:"grid", gridTemplateColumns:"1fr 1.4fr", width:"100%", maxWidth:"900px", background:"rgba(255,255,255,0.92)", borderRadius:"24px", boxShadow:"0 8px 40px rgba(0,0,0,0.10)", overflow:"hidden", minHeight:"480px" },
  left: { padding:"48px 40px", display:"flex", flexDirection:"column", gap:"18px", position:"relative", borderRight:"1px solid #e8f5e9" },
  blob: { position:"absolute", top:"-40px", right:"-40px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(165,214,167,0.18)", pointerEvents:"none" },
  logo: { display:"flex", alignItems:"center", gap:"8px" },
  logoText: { fontSize:"14px", fontWeight:"700", color:"#2e7d32" },
  heading: { fontSize:"38px", fontWeight:"800", color:"#111", lineHeight:1.2, margin:0 },
  green: { color:"#2e7d32" },
  sub: { fontSize:"14px", color:"#666", lineHeight:"1.65", margin:0 },
  pill: { display:"flex", alignItems:"flex-start", gap:"12px", background:"#f1f8f1", borderRadius:"12px", padding:"14px 16px" },
  pillIcon: { width:"32px", height:"32px", borderRadius:"8px", background:"#e8f5e9", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  pillText: { fontSize:"13px", color:"#555", lineHeight:"1.55", margin:0 },
  right: { padding:"48px 40px", display:"flex", flexDirection:"column", justifyContent:"center", position:"relative" },
  blobRight: { position:"absolute", top:"-40px", right:"-40px", width:"130px", height:"130px", borderRadius:"50%", background:"rgba(165,214,167,0.15)", pointerEvents:"none" },
  tag: { fontSize:"11px", fontWeight:"700", letterSpacing:"0.15em", color:"#2e7d32", margin:"0 0 8px" },
  formTitle: { fontSize:"28px", fontWeight:"800", color:"#111", margin:"0 0 6px" },
  formSub: { fontSize:"13.5px", color:"#777", margin:"0 0 24px" },
  form: { display:"flex", flexDirection:"column", gap:"16px" },
  field: { display:"flex", flexDirection:"column", gap:"5px" },
  label: { fontSize:"13px", fontWeight:"600", color:"#333" },
  req: { color:"#e53935" },
  inputWrap: { display:"flex", alignItems:"center", border:"1px solid #ddd", borderRadius:"10px", padding:"0 14px", gap:"10px", background:"#fff" },
  ico: { flexShrink:0 },
  input: { flex:1, border:"none", outline:"none", padding:"12px 0", fontSize:"14px", color:"#333", background:"transparent" },
  error: { fontSize:"13px", color:"#e53935", margin:0, background:"#fff5f5", padding:"10px 14px", borderRadius:"8px", border:"1px solid #ffcdd2" },
  btn: { width:"100%", padding:"14px", background:"#2e7d32", color:"white", border:"none", borderRadius:"10px", fontSize:"15px", fontWeight:"600", cursor:"pointer", marginTop:"4px" },
  btnDisabled: { background:"#a5d6a7", cursor:"not-allowed" },
  bottomText: { marginTop:"20px", fontSize:"13.5px", color:"#666", textAlign:"center" },
  link: { color:"#2e7d32", fontWeight:"600", cursor:"pointer" },
};

export default Login;
