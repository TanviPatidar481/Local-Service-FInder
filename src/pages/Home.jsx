import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-wrapper">
      {/* Navbar */}
      <nav className="home-nav">
        <div className="home-logo">
          <span className="logo-icon">📍</span>
          <span className="logo-text">LocalBuddy</span>
        </div>
      </nav>

      {/* Hero */}
      <div className="home-hero">
        <h1 className="hero-title">
          LocalBuddy <span className="hero-ai">AI</span>
        </h1>
        <p className="hero-subtitle">
          Your smart local companion to find trusted nearby services or grow your
          <br />
          business visibility with AI-powered recommendations.
        </p>
      </div>

      {/* Cards */}
      <div className="home-cards">
        {/* Find Services Card */}
        <div className="card card-left">
          <div className="card-icon green-icon">🔍</div>
          <h2 className="card-title">Find Services</h2>
          <p className="card-desc">
            Search for tutors, activity classes, indoor sports coaching,
            technicians, and event organizers near you.
          </p>
          <button className="btn btn-green" onClick={() => navigate("/signup")}>
            Sign Up as User &rarr;
          </button>
          <p className="card-login">
            Already have an account?{" "}
            <span className="login-link green-link" onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>

        {/* List Business Card */}
        <div className="card card-right">
          <div className="card-icon orange-icon">🏪</div>
          <h2 className="card-title">List Your Business</h2>
          <p className="card-desc">
            Register your service and connect with nearby users who are
            actively searching for what you offer.
          </p>
          <button className="btn btn-orange" onClick={() => navigate("/list-business")}>
            Register Business &rarr;
          </button>
          <p className="card-login">
            Already have an account?{" "}
            <span className="login-link orange-link" onClick={() => navigate("/login")}>Login</span>
          </p>
        </div>
      </div>

      {/* Footer tagline */}
      <div className="home-footer">
        <span>✨ AI-powered local discovery</span>
        <span className="divider">|</span>
        <span>⚡ Faster</span>
        <span className="divider">|</span>
        <span>🧠 Smarter</span>
        <span className="divider">|</span>
        <span>📍 Nearby</span>
      </div>
    </div>
  );
}
