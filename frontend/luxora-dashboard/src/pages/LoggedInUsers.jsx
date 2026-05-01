import { useEffect, useState } from "react";
import axios from "axios";

export default function LoggedInUsers() {
  const [users, setUsers] = useState([]);

  // --- DELETE ALL USERS ---
  const deleteAllUsers = async () => {
    if (window.confirm("Are you sure you want to clear ALL active sessions?")) {
      try {
        await axios.delete('http://127.0.0.1:8000/active-users'); 
        setUsers([]); // Clear local state immediately
        alert("All sessions cleared.");
      } catch (error) {
        console.error("Error deleting users:", error);
        alert("Failed to delete users. Ensure backend is running.");
      }
    }
  };

  // --- DELETE SPECIFIC USER ---
  const deleteSpecificUser = async (email) => {
    try {
      await axios.delete(`${import.meta.env.VITE_AI_URL || (import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + ""}/active-users/${email}`);
      // Remove the specific user from the UI list
      setUsers(prev => prev.filter(user => user.email !== email));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Could not delete user.");
    }
  };

  useEffect(() => {
    const fetchUsers = () => {
      axios.get((import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + "/active-users")
        .then(res => setUsers(res.data))
        .catch(err => console.error("Error fetching users:", err));
    };

    fetchUsers(); 
    const interval = setInterval(fetchUsers, 5000); // Polling every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "'Inter', sans-serif" }}>
      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "30px" }}>
        <div>
          <h2 style={{ margin: 0, letterSpacing: "1px", fontWeight: "700" }}>LIVE SESSIONS</h2>
          <p style={{ color: "#666", marginTop: "5px" }}>Monitoring platform activity in real-time</p>
          
          {/* Clear All Button */}
          <button 
            onClick={deleteAllUsers}
            style={{
              marginTop: "15px",
              padding: "8px 16px",
              backgroundColor: "#fff",
              color: "#ff4757",
              border: "1px solid #ff4757",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "12px",
              transition: "all 0.3s ease"
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = "#ff4757"; e.target.style.color = "white"; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = "white"; e.target.style.color = "#ff4757"; }}
          >
            CLEAR ALL SESSIONS
          </button>
        </div>
        
        <div style={{ textAlign: "right" }}>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>{users.length}</span>
          <p style={{ margin: 0, fontSize: "12px", color: "#888", textTransform: "uppercase" }}>Active Users</p>
        </div>
      </div>
      
      <table style={{
        width: "100%",
        borderCollapse: "separate",
        borderSpacing: "0 10px",
        background: "transparent",
      }}>
        <thead>
          <tr style={{ color: "#888", fontSize: "12px", textTransform: "uppercase" }}>
            <th style={{ padding: "10px 20px", textAlign: "left", fontWeight: "600" }}>Status</th>
            <th style={{ padding: "10px 20px", textAlign: "left", fontWeight: "600" }}>User Details</th>
            <th style={{ padding: "10px 20px", textAlign: "left", fontWeight: "600" }}>Platform Role</th>
            <th style={{ padding: "10px 20px", textAlign: "right", fontWeight: "600" }}>Manage</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: "40px", textAlign: "center", background: "#fff", borderRadius: "10px" }}>
                <p style={{ color: "#999" }}>No active sessions currently detected.</p>
              </td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index} style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                {/* Status Dot */}
                <td style={{ padding: "20px", borderRadius: "10px 0 0 10px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span className="pulse-dot" style={{
                      height: "8px",
                      width: "8px",
                      backgroundColor: "#2ecc71",
                      borderRadius: "50%",
                      display: "inline-block"
                    }}></span>
                    <span style={{ fontSize: "12px", color: "#2ecc71", fontWeight: "600" }}>LIVE</span>
                  </div>
                </td>

                {/* Name & Email */}
                <td style={{ padding: "20px" }}>
                  <div style={{ fontWeight: "600", color: "#333" }}>{user.name}</div>
                  <div style={{ fontSize: "13px", color: "#888" }}>{user.email}</div>
                </td>

                {/* Role Badge */}
                <td style={{ padding: "20px" }}>
                  <span style={{ 
                    padding: "6px 12px", 
                    borderRadius: "6px", 
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "0.5px",
                    background: user.role === "Merchant" || user.role === "Seller" ? "#fff3cd" : "#d1e7dd",
                    color: user.role === "Merchant" || user.role === "Seller" ? "#856404" : "#0f5132",
                    border: `1px solid ${user.role === "Merchant" || user.role === "Seller" ? "#ffeeba" : "#badbcc"}`
                  }}>
                    {user.role ? user.role.toUpperCase() : "GUEST"}
                  </span>
                </td>

                {/* Individual Delete Action */}
                <td style={{ padding: "20px", textAlign: "right", borderRadius: "0 10px 10px 0" }}>
                  <button 
                    onClick={() => deleteSpecificUser(user.email)}
                    title="Delete user session"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ccc",
                      fontSize: "18px",
                      cursor: "pointer",
                      transition: "color 0.2s ease"
                    }}
                    onMouseOver={(e) => e.target.style.color = "#ff4757"}
                    onMouseOut={(e) => e.target.style.color = "#ccc"}
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}