import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import LoginPage from "./pages/LoginPage";
import BuyerDashboard from "./pages/BuyerDashboard";
import MerchantDashboard from "./pages/MerchantDashboard";
import ProductsPage from "./pages/ProductsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AIPanel from "./pages/AIPanel"; 
import LoggedInUsers from "./pages/LoggedInUsers";
import AIChatPage from "./pages/AIChatPage";

function App() {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts once when the app loads
  useEffect(() => {
    const fetchSystemAlerts = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/forecast");
        
        // Transform backend 'insights' into the 'alerts' format used by TopBar
        const formattedAlerts = response.data.insights.map((item, index) => ({
          id: index,
          product: item.title,   // e.g., "Stock Risk"
          status: item.text,     // e.g., "Bed & Bath items low..."
          type: item.type        // 'alert' or 'opportunity'
        }));
        
        setAlerts(formattedAlerts);
      } catch (err) {
        console.error("Failed to fetch global alerts:", err);
      }
    };

    fetchSystemAlerts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        
        {/* Buyer Routes */}
        <Route path="/buyer" element={<BuyerDashboard />} />
        
        {/* Merchant Routes - Pass 'alerts' to components that need it */}
        <Route path="/merchant" element={<MerchantDashboard alerts={alerts} />} />
        <Route path="/merchant/products" element={<ProductsPage />} />
        <Route path="/merchant/analytics" element={<AnalyticsPage />} />
        <Route path="/merchant/users" element={<LoggedInUsers/>} />
        <Route path="/merchant/ai" element={<AIPanel />} /> 
        <Route path="/merchant/ai-assistant" element={<AIChatPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;