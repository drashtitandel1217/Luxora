import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SalesChart from "../components/SalesChart";
import CategoryChart from "../components/CategoryChart";
import OperationalAnalytics from "./OperationalAnalytics"; 
import "../styles/dashboard.css";

export default function AnalyticsPage() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="content-area">
        <Topbar />
        <div className="charts-grid">
          <SalesChart />
          <CategoryChart />
        </div>
        {/* Real Olist Data Operational Charts */}
        <div style={{ marginTop: '20px' }}>
          <OperationalAnalytics />
        </div>
      </div>
    </div>
  );
}