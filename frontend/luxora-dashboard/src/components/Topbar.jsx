import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../styles/topbar.css'; 

export default function Topbar({ alerts = [] }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  return (
    <div className="topbar-bw">
      <div className="topbar-left">
        <span className="brand-bold">LUXORA</span>
        <span className="brand-thin"> / MERCHANT ANALYTICS</span>
      </div>

      <div className="topbar-right">
        <div className="notification-container" onClick={toggleDialog} style={{ cursor: 'pointer', position: 'relative' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {/* The Badge - Shows the number of AI alerts */}
            {alerts.length > 0 && (
              <span className="bw-badge">{alerts.length}</span>
            )}
        </div>

        <div className="v-line"></div>
        <div className="admin-profile-bw">
          <div className="avatar-square">AD</div>
          <div className="admin-text">
            <p className="name-black">ADMIN</p>
            <p className="status-gray">SYSTEM LIVE</p>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className="modal-overlay" onClick={toggleDialog}>
          <div className="sober-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>SYSTEM NOTIFICATIONS</h3>
              <button className="close-x" onClick={toggleDialog}>×</button>
            </div>
            <div className="dialog-body">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <div key={index} className={`dialog-item ${alert.type}`}>
                    <div className="item-row">
                      <span className={`status-dot ${alert.type}`}></span>
                      <strong className="prod-name">{alert.product}</strong>
                    </div>
                    <p className="status-desc">{alert.status}</p>
                  </div>
                ))
              ) : (
                <div className="empty-state">No active system alerts.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}