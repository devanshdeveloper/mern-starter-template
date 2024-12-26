import { Helmet } from "react-helmet-async";
import StatsGrid from "./components/StatsGrid";
import RevenueChart from "./components/RevenueChart";
import TopProducts from "./components/TopProducts";
import RecentOrders from "./components/RecentOrders";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | E-Commerce Admin</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">Welcome back to your dashboard</p>
        </div>
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RevenueChart />
          <TopProducts />
        </div>
        <RecentOrders />
      </div>
    </>
  );
};

export default Dashboard;
