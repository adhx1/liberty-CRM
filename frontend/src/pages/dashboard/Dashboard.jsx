import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layouts/Layout";
import { getDashboardData } from "../../api/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./Dashboard.css";

const COLORS = ["#ff0b0b96", "#fca00cac", "#2d00f4ba", "#21f700"];

const Dashboard = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboardData();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <Layout>Loading...</Layout>;

  return (
    <Layout>
      {/* SUMMARY CARDS */}
      <div className="dashboard-grid">
        <div className="card">
          <h4>Today Income</h4>
          <p>{data.today_income}</p>
        </div>

        <div className="card">
          <h4>Monthly Income</h4>
          <p>{data.monthly_income}</p>
        </div>

        <div className="card">
          <h4>Net Profit</h4>
          <p>{data.net_profit}</p>
        </div>

        <div
          className="card clickable"
          onClick={() => navigate("/jobs")}
        >
          <h4>Pending Jobs</h4>
          <p>{data.pending_jobs}</p>
        </div>

        <div
          className="card clickable"
          onClick={() => navigate("/jobs")}
        >
          <h4>Overdue Jobs</h4>
          <p>{data.overdue_jobs}</p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="charts-container">
        <div className="chart-box">
          <h3>Monthly Income</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthly_breakdown}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-box">
          <h3>Job Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.job_status_counts}
                dataKey="count"
                nameKey="status"
                outerRadius={100}
                label
              >
                {data.job_status_counts.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;