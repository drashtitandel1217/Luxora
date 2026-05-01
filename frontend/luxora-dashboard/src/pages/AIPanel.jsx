import React, { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AIPanel() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get((import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + "/forecast")
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("AI Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  const chartData = data ? [
    { month: "Current", sales: data.current_avg },
    { month: "Month 1", sales: data.forecast_data[0] },
    { month: "Month 2", sales: data.forecast_data[1] },
    { month: "Month 3", sales: data.forecast_data[2] },
    { month: "Month 4", sales: data.forecast_data[3] },
  ] : [];

  if (loading) return <div style={{ color: "#6366f1", padding: "40px" }}>⏳ Engine Booting: Loading Random Forest Model...</div>;

  return (
    <div style={{ padding: "30px", background: "#111", borderRadius: "20px",marginTop: "100px", color: "#fff" }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}><span style={{ color: "#6366f1" }}>LUXORA</span> AI ENGINE</h2>
        <span style={{ fontSize: '12px', color: '#6366f1', border: '1px solid #6366f1', padding: '4px 10px', borderRadius: '15px' }}>
          {data.model_type}
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "25px" }}>
        {/* Graph Card */}
        <div style={{ background: "#1a1a1a", padding: "20px", borderRadius: "15px", border: "1px solid #333" }}>
          <h4 style={{ color: "#888", marginBottom: "15px" }}>DEMAND PROJECTION</h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#555" fontSize={12} />
              <YAxis stroke="#555" fontSize={12} />
              <Tooltip contentStyle={{ background: "#222", border: "none" }} />
              <Area type="monotone" dataKey="sales" stroke="#6366f1" fillOpacity={1} fill="url(#colorSales)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Insights Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {data.insights.map((insight, index) => (
            <div key={index} style={{ 
              padding: "15px", 
              borderRadius: "12px", 
              background: insight.type === 'alert' ? "#ff475711" : "#2ed57311",
              borderLeft: `4px solid ${insight.type === 'alert' ? '#ff4757' : '#2ed573'}`
            }}>
              <div style={{ fontWeight: "bold", fontSize: "12px", color: insight.type === 'alert' ? '#ff4757' : '#2ed573', marginBottom: '5px' }}>
                {insight.title.toUpperCase()}
              </div>
              <div style={{ fontSize: "13px", color: "#ccc" }}>{insight.text}</div>
            </div>
          ))}

          <div style={{ background: "#222", padding: "15px", borderRadius: "12px" }}>
             <div style={{ fontSize: '11px', color: '#888' }}>PREDICTED GROWTH</div>
             <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2ed573' }}>{data.predicted_growth}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#6366f1', borderRadius: '10px', color: '#fff' }}>
        <strong>🤖 AI STRATEGY:</strong> {data.recommendation}
      </div>
    </div>
  );
}