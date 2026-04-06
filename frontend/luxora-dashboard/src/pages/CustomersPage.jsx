import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";

export default function CustomersPage() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="content-area">
        <Topbar />
        <h2>Customers Overview</h2>
        <p>Customer segmentation and insights will appear here.</p>
      </div>
    </div>
  );
}

