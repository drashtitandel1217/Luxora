import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/analytics/sales-trend");
        
        // Match the keys coming from the new SQL query
        const normalizedData = response.data.map(item => ({
          // We use 'month_name' here because that's what your XAxis uses below
          month_name: item.month_name || item.MONTH_NAME || "Unknown",
          amount: item.amount || item.AMOUNT || 0
        }));

        console.table(normalizedData);
        setData(normalizedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    loadData();
  }, []);

  if (!data.length) return <p style={{color: 'black'}}>Loading Sales Trends...</p>;

  return (
    <div className="chart-box">
      <h3 style={{color: 'black', marginBottom: '15px'}}>Olist Monthly Sales Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ccc" />
          
          <XAxis 
            dataKey="month_name" 
            stroke="#000" 
            tick={{fill: 'black', fontSize: 10}} 
            angle={-45} 
            textAnchor="end"
            interval={0}
          />
          
          <YAxis 
            stroke="#000" 
            tick={{fill: 'black'}} 
            tickFormatter={(value) => `₹${(value / 1000000).toFixed(1)}M`} 
          />
          
          <Tooltip />
          
          <Line
            type="monotone"
            dataKey="amount" 
            stroke="#000"
            strokeWidth={4}
            dot={{ r: 4, fill: '#000' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;