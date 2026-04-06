import React from 'react';

export default function TopProducts() {
  // Enhanced mock data (Replace with your actual CSV data later)
  const products = [
    { id: 'aca2eb7d00', name: 'Silk Evening Gown', category: 'Apparel', sales: 527, growth: '+12.5%' },
    { id: '99a4788cb2', name: 'Leather Chelsea Boots', category: 'Footwear', sales: 488, growth: '+8.2%' },
    { id: '422879e10f', name: 'Velvet Clutch Bag', category: 'Accessories', sales: 484, growth: '+15.0%' },
    { id: '389d119b48', name: 'Cashmere Scarf', category: 'Apparel', sales: 392, growth: '-2.4%' },
    { id: '368c6c7308', name: 'Gold Rim Sunglasses', category: 'Accessories', sales: 388, growth: '+5.1%' },
  ];

  return (
    <div style={{
      background: '#ffffff',
      padding: '24px',
      borderRadius: '16px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>Top Selling Products</h3>
        <button style={{ 
          background: '#f3f4f6', border: 'none', padding: '6px 12px', borderRadius: '8px', 
          fontSize: '13px', fontWeight: '600', cursor: 'pointer' 
        }}>View All</button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left' }}>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Total Sales</th>
            <th style={thStyle}>Trend</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #f9f9f9' }}>
              {/* Product Info with Icon */}
              <td style={tdStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                  }}>
                    🛍️
                  </div>
                  <div>
                    <div style={{ fontWeight: '600', color: '#333', fontSize: '14px' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#999', fontFamily: 'monospace' }}>ID: {item.id}...</div>
                  </div>
                </div>
              </td>

              {/* Category Badge */}
              <td style={tdStyle}>
                <span style={{ 
                  padding: '4px 10px', background: '#eef2ff', color: '#040404', 
                  borderRadius: '20px', fontSize: '11px', fontWeight: '600' 
                }}>
                  {item.category}
                </span>
              </td>

              {/* Sales Count */}
              <td style={{ ...tdStyle, fontWeight: '700', color: '#111' }}>
                {item.sales.toLocaleString()}
              </td>

              {/* Growth Trend */}
              <td style={tdStyle}>
                <span style={{ 
                  color: item.growth.startsWith('+') ? '#10b981' : '#ef4444',
                  fontSize: '13px', fontWeight: '600'
                }}>
                  {item.growth}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styling Constants
const thStyle = {
  padding: '12px 8px',
  color: '#888',
  fontSize: '12px',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.5px'
};

const tdStyle = {
  padding: '16px 8px',
  fontSize: '14px'
};