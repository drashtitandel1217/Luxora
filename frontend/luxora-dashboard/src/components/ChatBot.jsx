import { useState } from "react";
import axios from "axios";

export default function LuxoraChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { text: "Hello! I'm the Luxora AI. How can I help your business today?", sender: "ai" }
  ]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post((import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + "/ai-chat", { message: input });
      setMessages([...newMessages, { text: res.data.response, sender: "ai" }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { text: "Backend unreachable. Is main.py running?", sender: "ai" }]);
    }
  };

  return (
    <div style={{ 
      backgroundColor: "#111", 
      borderRadius: "15px", 
      padding: "25px", 
      color: "white", 
      height: "450px", 
      display: "flex", 
      flexDirection: "column",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      border: "1px solid #333"
    }}>
      <h3 style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#888", letterSpacing: "1px" }}>LUXORA AI ASSISTANT</h3>
      
      {/* Chat History */}
      <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
            backgroundColor: m.sender === "user" ? "#2563eb" : "#2a2a2a",
            color: "white",
            padding: "12px 16px",
            borderRadius: m.sender === "user" ? "15px 15px 0 15px" : "15px 15px 15px 0",
            maxWidth: "75%",
            fontSize: "14px",
            lineHeight: "1.4"
          }}>
            {m.text}
          </div>
        ))}
      </div>

      {/* Input Area - Force 100% width and prevent squeezing */}
      <div style={{ 
        display: "flex", 
        gap: "10px", 
        width: "100%", 
        marginTop: "auto", // Pushes it to the bottom
        boxSizing: "border-box" 
      }}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about sales..."
          style={{ 
            flexGrow: 1,       // Force it to take all available space
            minWidth: "0",     // CRITICAL: Allows flex items to shrink below their content size
            padding: "12px", 
            borderRadius: "8px", 
            border: "1px solid #444", 
            background: "#222", 
            color: "white",
            fontSize: "14px",
            outline: "none"
          }}
        />
        <button 
          onClick={sendMessage} 
          style={{ 
            padding: "0 20px", 
            borderRadius: "8px", 
            border: "none", 
            backgroundColor: "#2563eb", 
            color: "white", 
            cursor: "pointer",
            fontWeight: "600",
            whiteSpace: "nowrap" // Prevents the button text from wrapping
          }}
        >
          Send
        </button>
      </div>
      </div>
  );
}