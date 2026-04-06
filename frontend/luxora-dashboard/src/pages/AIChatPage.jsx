import  { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";


export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I am Luxora AI. I have analyzed your Olist dataset. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

        const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
          const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });
          const fullText = response.data.reply;
          
          // Typewriter Logic
          let currentText = "";
          //const aiMessageIndex = messages.length + 1;
          
          setMessages(prev => [...prev, { role: "ai", text: "" }]); // Add empty AI message

          let i = 0;
          const interval = setInterval(() => {
            currentText += fullText[i];
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].text = currentText;
              return newMessages;
            });
            i++;
            if (i === fullText.length) clearInterval(interval);
          }, 15); // Adjust speed here

        } catch (error) {
          setMessages(prev => [...prev, { role: "ai", text: "⚠️ Error connecting to Luxora Engine." }]);
        } finally {
          setIsLoading(false);
        }
      };

  return (
    <div className="dashboard-wrapper" style={{ display: 'flex', background: '#0a0a0a', height: '100vh' }}>
      <Sidebar />
      
      <div className="content-area" style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', height: '85vh' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ color: '#612175', margin: 0 }}>LUXORA <span style={{ color: '#6366f1' }}>AI ASSISTANT</span></h2>
            <p style={{ color: '#888', fontSize: '14px' }}>Powered by Llama 3 • Local LLM Inference</p>
          </div>

          {/* Chat Window */}
          <div style={{ 
            flex: 1, 
            background: '#161616', 
            borderRadius: '20px', 
            padding: '20px', 
            overflowY: 'auto', 
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '12px 18px',
                borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
                background: msg.role === 'user' ? '#6366f1' : '#262626',
                color: '#fff',
                fontSize: '15px',
                lineHeight: '1.5'
              }}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div style={{ alignSelf: 'flex-start', color: '#6366f1', fontSize: '12px' }}>
                ⚡ Luxora AI is thinking...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
            <div style={{ 
              marginTop: '20px', 
              display: 'flex', 
              gap: '15px', 
              alignItems: 'center',
              width: '100%' 
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                {["Sales Forecast", "Stock Risk", "Procurement Strategy"].map((text) => (
                  <button
                    key={text}
                    onClick={() => setInput(`Give me a brief ${text} update.`)}
                    style={{
                      background: '#262626',
                      color: '#888',
                      border: '1px solid #333',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    {text}
                  </button>
                ))}
              </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Llama 3 about your Olist sales trends..."
              style={{ 
                flex: 5,               // ⬅️ This makes the input 5x larger than the button
                background: '#1a1a1a', 
                border: '1px solid #333', 
                padding: '18px 20px',  // ⬅️ Increased padding for a better feel
                borderRadius: '14px', 
                color: '#fff',
                fontSize: '16px',      // ⬅️ Slightly larger font for readability
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#6366f1'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
            
            <button 
              onClick={handleSend}
              disabled={isLoading}
              style={{ 
                flex: 1,               // ⬅️ Fixed proportion
                height: '58px',        // ⬅️ Matches the height of the input
                background: '#6366f1', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '14px', 
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '15px',
                letterSpacing: '1px',
                opacity: isLoading ? 0.5 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {isLoading ? "..." : "SEND"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}