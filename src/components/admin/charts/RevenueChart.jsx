'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    month: 'Jan',
    revenue: 12000,
  },
  {
    month: 'Feb',
    revenue: 18000,
  },
  {
    month: 'Mar',
    revenue: 15000,
  },
  {
    month: 'Apr',
    revenue: 25000,
  },
  {
    month: 'May',
    revenue: 32000,
  },
  {
    month: 'Jun',
    revenue: 40000,
  },
];

export default function RevenueChart() {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold">Revenue Overview</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#000"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
