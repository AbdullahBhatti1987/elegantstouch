import RevenueChart from '@/components/admin/charts/RevenueChart';
import SalesCategoryChart from '@/components/admin/charts/SalesCategoryChart';
import OrdersChart from '@/components/admin/charts/OrdersChart';
import UserGrowthChart from '@/components/admin/charts/UserGrowthChart';
import CategoryRadialChart from '@/components/admin/charts/CategoryRadialChart';
import DashboardStats from '@/components/admin/dashboard/DashboardStats';

export default function AdminDashboard() {
  return (
    <div className="space-y-4">

      <DashboardStats />

      <div className="grid gap-4 lg:grid-cols-2 grid-cols-1">
        <CategoryRadialChart />

        <RevenueChart />

        <OrdersChart />

        <SalesCategoryChart />

        <UserGrowthChart />
      </div>
    </div>
  );
}
