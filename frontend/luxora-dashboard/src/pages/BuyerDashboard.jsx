import React, { useState, useEffect } from "react";
import axios from "axios";
import Topbar from "../components/Topbar"; 
import "../styles/buyer.css";

export default function BuyerDashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBuyerData = async () => {
      try {
        // 1. Fetch Dynamic Products from FastAPI
        const prodRes = await axios.get((import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + "/api/products");
        setProducts(prodRes.data);

        // 2. Fetch Buyer-Specific Notifications
        const alertRes = await axios.get((import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + "/api/buyer/notifications");
        setAlerts(alertRes.data.alerts);

        // 3. Fetch Active Users count
        const userRes = await axios.get((import.meta.env.VITE_AI_URL || "http://127.0.0.1:8000") + "/active-users");
        setUsers(userRes.data);
        
        setIsLoading(false);
      } catch (err) {
        console.error("Buyer Dashboard Sync Error:", err);
        setIsLoading(false);
      }
    };
    fetchBuyerData();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };
  

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="buyer-page-root" style={{ background: '#fcfcfc', minHeight: '100vh' }}>
      {/* 1. TOPBAR - Title changed to Shopper Experience */}
      <Topbar alerts={alerts} title="SHOPPER EXPERIENCE" />

      {/* 2. MAIN LAYOUT WRAPPER */}
      <div style={{ display: 'flex', width: '100%', paddingTop: '20px' }}>
        
        {/* LEFT SECTION: PRODUCTS */}
        <div className="main-content-area" style={{ flex: 1, padding: '0 40px' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <div>
              <h2 style={{ margin: 0, fontWeight: '900', fontSize: '28px', color: '#1a1a1a' }}>
                EXPLORE <span style={{ color: '#6366f1' }}>COLLECTIONS</span>
              </h2>
              <p style={{ color: '#777', fontSize: '14px', marginTop: '5px' }}>Based on trending Olist categories</p>
            </div>
            
            {/* Live Shoppers Badge */}
            <div style={{ 
              background: '#fff', 
              padding: '10px 18px', 
              borderRadius: '30px', 
              border: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}>
              <span className="pulse-dot" style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></span>
              <span style={{ fontSize: '14px', fontWeight: '700', color: '#444' }}>{users.length} Users Browsing</span>
            </div>
          </div>

          {/* Product Grid Handling */}
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '100px', color: '#6366f1', fontWeight: 'bold' }}>
              SYNCING WITH LUXORA ENGINE...
            </div>
          ) : (
            <div className="product-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', 
              gap: '25px' 
            }}>
              {products.map((p, i) => (
                <div className="product-card" key={i} style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  border: '1px solid #f0f0f0',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.03)'
                }}>
                  <div className="product-img" style={{ 
                    backgroundImage: `url(${p.img})`, 
                    height: '200px', 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                  <div className="product-info" style={{ padding: '20px' }}>
                    <p style={{ color: '#6366f1', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '5px' }}>{p.cat}</p>
                    <h4 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#111' }}>{p.name}</h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '900', fontSize: '18px' }}>₹{p.price}</span>
                      <button 
                        onClick={() => addToCart(p)}
                        style={{ background: '#111', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                      >
                        + ADD
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SECTION: CART DRAWER (Sticky so it stays visible) */}
        <aside className="cart-sidebar" style={{ 
          width: '380px', 
          background: '#fff', 
          height: 'calc(100vh - 100px)', 
          position: 'sticky', 
          top: '80px', 
          borderLeft: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ padding: '25px', borderBottom: '1px solid #f5f5f5' }}>
            <h3 style={{ margin: 0, fontSize: '18px', letterSpacing: '0.5px' }}>YOUR BAG <span style={{ color: '#6366f1' }}>({cart.length})</span></h3>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '25px' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#bbb', marginTop: '50px' }}>
                <p>Bag is empty.</p>
              </div>
            ) : (
              cart.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: "15px", marginBottom: "20px", alignItems: "center" }}>
                  <img src={item.img} width="60" height="60" style={{ objectFit: "cover", borderRadius: "10px" }} />
                  <div style={{ flex: 1 }}>
                    <h5 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.name}</h5>
                    <p style={{ margin: 0, fontSize: "14px", fontWeight: 'bold', color: '#6366f1' }}>₹{item.price}</p>
                  </div>
                  <button 
                    onClick={() => removeItem(i)} 
                    style={{ background: "none", border: "none", color: "#ff4d4d", cursor: "pointer", fontSize: '20px' }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          <div style={{ padding: '25px', borderTop: '1px solid #f5f5f5', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: '#666' }}>
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
              <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total:</span>
              <span style={{ fontSize: "22px", fontWeight: "900", color: '#111' }}>₹{total}</span>
            </div>
            <button style={{ 
              width: '100%', 
              padding: '18px', 
              background: '#6366f1', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '15px', 
              fontWeight: 'bold', 
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
            }}>
              PROCEED TO CHECKOUT
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}