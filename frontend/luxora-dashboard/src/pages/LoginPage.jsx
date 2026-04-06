import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Added axios
import "../styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [slideIndex, setSlideIndex] = useState(0);
  
  // New State for Form Inputs
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const slides = [
    "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2000",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=2000",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

 const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Force a "Buyer" or "Merchant" role string for the DB
    const dbRole = role === "buyer" ? "Buyer" : "Merchant";

    const userData = {
      email: email,
      name: name,
      role: dbRole
    };

    try {
      // 2. THIS IS THE KEY: Send to backend
      console.log("Saving user to DB:", userData);
      await axios.post("http://127.0.0.1:8000/login", userData);
      
      // 3. ONLY navigate after the save is attempted
      if (role === "buyer") {
        navigate("/buyer");
      } else {
        navigate("/merchant");
      }
    } catch (err) {
      console.error("Database save failed:", err);
      // Fallback so you don't get stuck on the login page
      role === "buyer" ? navigate("/buyer") : navigate("/merchant");
    }
  };

  return (
    <div className="login-page">
      {slides.map((img, i) => (
        <div
          key={i}
          className={`slide ${i === slideIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      <div className="login-container">
        <div className="logo">LUXORA</div>

        {!role ? (
          <div className="selection">
            <div className="card" onClick={() => setRole("buyer")}>
              <h2>Fashionista</h2>
              <span>BUYER PORTAL</span>
            </div>
            <div className="card" onClick={() => setRole("merchant")}>
              <h2>Merchant</h2>
              <span>SELLER PORTAL</span>
            </div>
          </div>
        ) : (
          <div className="login-box">
            <button className="back-btn" onClick={() => setRole(null)}>← Back</button>
            <h2>{role === "buyer" ? "BUYER LOGIN" : "MERCHANT LOGIN"}</h2>

            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required 
              />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
              <input type="password" placeholder="Password" required />

              <button type="submit">ENTER PORTAL</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}