import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import axios from "axios";

export default function CategoryChart() {
  const [data, setData] = useState([]);
  const colors = ["#4f46e5", "#7c3aed", "#2563eb", "#3b82f6", "#60a5fa"];

  useEffect(() => {
    axios.get("http://localhost:8080/api/analytics/top-categories")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="chart-box">
      <h3 style={{color: 'black'}}>Top Product Categories</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" tick={{fill: 'black', fontSize: 10}} />
          <YAxis tick={{fill: 'black'}} />
          <Tooltip />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}