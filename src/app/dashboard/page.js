import RevenueChart from '@/components/admin/charts/RevenueChart';
import SalesCategoryChart from '@/components/admin/charts/SalesCategoryChart';
import OrdersChart from '@/components/admin/charts/OrdersChart';
import UserGrowthChart from '@/components/admin/charts/UserGrowthChart';
import CategoryRadialChart from '@/components/admin/charts/CategoryRadialChart';

export default function AdminDashboard() {
  return (
    <div className="grid gap-6 p-6 lg:grid-cols-2">
      <CategoryRadialChart />

      <RevenueChart />

      <OrdersChart />

      <SalesCategoryChart />

      <UserGrowthChart />




    </div>
  );
}
