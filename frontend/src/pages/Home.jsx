import { useNavigate } from "react-router-dom";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      
      {/* LEFT */}
      <div className="left">
        <h1>Local Resource Finder</h1>
        <p>
          Find trusted local services or grow your business by reaching nearby customers.
        </p>
      </div>

      {/* RIGHT */}
      <div className="right">
        <div className="card">
          <h2>Get Started</h2>

          <button onClick={() => navigate("/signup")}>
            Sign Up (Customer)
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/list-business")}
          >
            List Your Business
          </button>
        </div>
      </div>

    </div>
  );
}