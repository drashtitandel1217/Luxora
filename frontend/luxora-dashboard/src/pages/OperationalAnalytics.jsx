import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { apiService } from "../services/api"; // Link to your new API file

const COLORS = ["#000000", "#333333", "#666666", "#999999", "#cccccc"];

export default function OperationalAnalytics() {
  const [dayData, setDayData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    // Fetch Real Olist Data from Spring Boot
    const fetchData = async () => {
      try {
        const dayRes = await apiService.getOrdersPerDay();
        const catRes = await apiService.getOrdersByCategory();
        
        // Normalize keys (ensure lowercase 'day', 'count', 'name', 'value')
        setDayData(dayRes.map(d => ({ day: d.day || d.DAY, count: d.count || d.COUNT })));
        setCategoryData(catRes.map(c => ({ name: c.name || c.NAME, value: c.value || c.VALUE })));
      } catch (err) {
        console.error("Dashboard Sync Failed:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="operational-grid">
      <div className="chart-box">
        <h3>Orders Per Day</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={dayData}>
            <XAxis dataKey="day" tick={{fill: 'black', fontSize: 10}} />
            <YAxis tick={{fill: 'black'}} />
            <Tooltip />
            <Bar dataKey="count" fill="#000" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Orders By Category</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}