import { useNavigate } from "react-router-dom";
import axios from "axios";

// Adding 'default' here fixes the error in MerchantDashboard.jsx
export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const email = localStorage.getItem("userEmail");

    try {
      if (email) {
        await axios.post(`${import.meta.env.VITE_AI_URL || (import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + ""}/logout?user_email=${email}`);
      }
    } catch (err) {
      console.error("Logout failed on server, clearing session anyway.");
    } finally {
      localStorage.clear(); 
      navigate("/");
    }
  };

  return (
    <div className="sidebar">
      <h2>LUXORA</h2>

      <ul>
        <li onClick={() => navigate("/merchant")}>Dashboard</li>
        <li onClick={() => navigate("/merchant/products")}>Products</li>
        <li onClick={() => navigate("/merchant/analytics")}>Analytics</li>
        <li onClick={() => navigate("/merchant/users")}>Logged In Users</li>
        <li onClick={() => navigate("/merchant/ai")}>AI Panel</li>
        <li onClick={() => navigate("/merchant/ai-assistant")}>AIChatPage</li>
      </ul>

      <div style={{ padding: "20px" }}>
        <button 
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            background: "#ff4757", 
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            width: "100%"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}