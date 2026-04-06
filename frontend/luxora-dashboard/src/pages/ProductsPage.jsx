import  { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import CategoryChart from "../components/CategoryChart";
import { apiService } from "../services/api";
import "../styles/dashboard.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using the merchant-specific endpoint for inventory details
    apiService.getProducts().then(data => {
      if (data && Array.isArray(data)) {
        setProducts(data.slice(0, 10)); 
      }
      setLoading(false);
    }).catch(err => {
      console.error("Failed to fetch merchant products:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="content-area">
        <Topbar title="INVENTORY MANAGEMENT" />
        
        <div className="dashboard-container" style={{ padding: "30px" }}>
          <div style={{ marginBottom: "20px" }}>
             <h1 style={{ color: "#000", margin: 0, fontWeight: "900" }}>INVENTORY <span style={{ color: "#6366f1" }}>ANALYTICS</span></h1>
             <p style={{ color: "#666" }}>Real-time stock monitoring from Olist Dataset</p>
          </div>
          
          <div className="charts-grid">
            <CategoryChart />
          </div>

          <div className="product-list-container" style={{ 
            marginTop: "30px", 
            background: "#fff", 
            padding: "25px", 
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            border: "1px solid #eee" 
          }}>
            <h3 style={{ color: "#000", marginBottom: "20px" }}>Recent Product Inventory</h3>
            
            {loading ? (
              <p style={{ textAlign: "center", padding: "20px" }}>Loading inventory data...</p>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #f0f0f0", textAlign: "left", color: "#888", fontSize: "12px", textTransform: "uppercase" }}>
                    <th style={{ padding: "12px" }}>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #f9f9f9", transition: "background 0.2s" }} className="table-row-hover">
                      <td style={{ padding: "15px 12px", fontWeight: "600", color: "#111" }}>
                        {/* Optional chaining ?. ensures no 'substring' crash if name is missing */}
                        {p.name ? p.name.substring(0, 25) : "Unknown Product"}...
                      </td>
                      <td style={{ textTransform: "capitalize", color: "#6366f1", fontWeight: "500", fontSize: "13px" }}>
                        {p.cat ? p.cat.replace("_", " ") : "General"}
                      </td>
                      <td style={{ fontWeight: "700" }}>₹{p.price || "N/A"}</td>
                      <td>
                        <span style={{ 
                          padding: "5px 12px", 
                          borderRadius: "20px", 
                          fontSize: "11px", 
                          fontWeight: "bold",
                          background: "#e0f2fe", 
                          color: "#0369a1" 
                        }}>
                          IN STOCK
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}