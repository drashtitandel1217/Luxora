import { useState } from "react";
import axios from "axios";

export default function Login({ role }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async () => {
    if (!email || !name) return alert("Please enter email and name");

    try {
      const res = await axios.post("http://127.0.0.1:8000/login", {
        email,
        name,
        role, // "Buyer" or "Seller"
      });
      alert(`Logged in as ${res.data.user.name} (${res.data.user.role})`);
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>{role} Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "10px" }}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}