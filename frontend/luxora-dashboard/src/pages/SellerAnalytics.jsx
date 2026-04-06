import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, Legend, ResponsiveContainer
} from "recharts";
import { apiService } from "../services/api"; // Ensure this path is correct

const COLORS = ["#000000", "#222222", "#444444", "#666666", "#888888"];

export default function SellerAnalytics() {
  const [dayData, setDayData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Day Data
        const days = await apiService.getOrdersPerDay();
        setDayData(days.map(d => ({ 
          day: d.day || d.DAY, 
          orders: d.count || d.COUNT 
        })));

        // 2. Fetch Category Data
        const cats = await apiService.getOrdersByCategory();
        setCategoryData(cats.map(c => ({ 
          name: c.name || c.NAME, 
          value: c.value || c.VALUE 
        })));
      } catch (error) {
        console.error("🔴 Seller Analytics Fetch Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px", background: "#fff", borderRadius: "8px" }}>
      <h2 style={{ color: "#000" }}>Seller Analytics (Olist Data)</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "20px" }}>
        
        {/* BAR GRAPH */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={{ color: "#333" }}>Orders Per Day</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dayData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#000000" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h3 style={{ color: "#333" }}>Orders By Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}