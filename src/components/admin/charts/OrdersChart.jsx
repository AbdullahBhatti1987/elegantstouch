'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    month: 'Jan',
    orders: 120,
  },
  {
    month: 'Feb',
    orders: 200,
  },
  {
    month: 'Mar',
    orders: 150,
  },
  {
    month: 'Apr',
    orders: 300,
  },
  {
    month: 'May',
    orders: 280,
  },
];

export default function OrdersChart() {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold">Monthly Orders</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="orders" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
