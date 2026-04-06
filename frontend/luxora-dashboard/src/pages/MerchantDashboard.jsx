import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";
import SalesChart from "../components/SalesChart";
import CategoryChart from "../components/CategoryChart";
import SellerAnalytics from "./SellerAnalytics"; 
import TopProducts from "../components/TopProducts";
import LoggedInUsers from "./LoggedInUsers";
import AIPanel from "./AIPanel";
import LuxoraChat from "../components/ChatBot";
import "../styles/dashboard.css";
import * as XLSX from 'xlsx';

export default function MerchantDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0 });
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to process inventory logic
  const processAlerts = (data) => {
    const newAlerts = [];
    data.forEach(item => {
      if (item.quantity <= 5) {
        newAlerts.push({
          id: item.id,
          product: item.name,
          status: item.quantity === 0 ? "OUT OF STOCK" : `LOW STOCK (${item.quantity})`,
          type: "urgent"
        });
      } else if (item.daysSinceLastSale > 30) {
        newAlerts.push({
          id: item.id,
          product: item.name,
          status: "STAGNANT (30D+ NO SALES)",
          type: "warning"
        });
      }
    });
    setAlerts(newAlerts);
  };

  // Helper for Millions formatting
  const formatRevenue = (val) => `₹${(val / 1000000).toFixed(1)}M`;

  useEffect(() => {
    setLoading(true);
    const API_BASE = "http://localhost:8080/api";

    // 1. Fetch Stats (The most important part)
    axios.get(`${API_BASE}/analytics/summary`)
        .then(res => {
            console.log("✅ Summary Data:", res.data);
            setStats({
                revenue: res.data.revenue || 0,
                orders: res.data.orders || 0,
                products: res.data.products || 0,
                customers: res.data.customers || 0
            });
        })
        .catch(err => console.error("❌ Summary failed:", err))
        .finally(() => setLoading(false)); // Hide the loading spinner once stats are in

    // 2. Fetch Products (The heavy part)
    axios.get(`${API_BASE}/analytics/products`)
        .then(res => {
            console.log("✅ Products Data received");
            processAlerts(res.data);
        })
        .catch(err => console.error("❌ Products list failed:", err));
    
}, []);
  const handleExportReport = () => {
    const workbook = XLSX.utils.book_new();
    
    const summaryData = [
      { Metric: "Total Revenue", Value: formatRevenue(stats.revenue) },
      { Metric: "Total Orders", Value: stats.orders.toLocaleString() }
    ];
    
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(summaryData), "Summary");
    XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(alerts), "Inventory Alerts");
    XLSX.writeFile(workbook, "Luxora_Full_Report.xlsx");
  };
  

  return (
    <div className="dashboard-wrapper" style={{ background: '#fff' }}>
      <Sidebar />

      <div className="content-area">
        <Topbar alerts={alerts} />

        <div className="dashboard-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h1 style={{ color: "black", margin: 0, fontSize: "24px", fontWeight: "800" }}>
              Merchant Dashboard
            </h1>
          </div>

          <div className="cards">
            <StatCard 
              title="Revenue" 
              value={loading ? "..." : formatRevenue(stats.revenue)} 
            />
            <StatCard 
              title="Orders" 
              value={loading ? "..." : String(stats.orders)} 
            />
            <StatCard 
              title="Products" 
              value={loading ? "..." : String(stats.products)} 
            />
            <StatCard 
              title="Customers" 
              value={loading ? "..." : String(stats.customers)} 
            />
          </div>

          <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px' }}>
            <div className="chart-box" style={{ border: '2px solid #000', padding: '15px' }}><SalesChart /></div>
            <div className="chart-box" style={{ border: '2px solid #000', padding: '15px' }}><CategoryChart /></div>
          </div>

          <div className="ai-section-wrapper"><AIPanel /></div>

          <div className="data-grid">
            <div className="data-card"><SellerAnalytics /></div>
            <div className="data-card"><LoggedInUsers /></div>
          </div>

          <div className="products-section"><TopProducts /></div>
        </div>
      </div>
    </div>
  );
}