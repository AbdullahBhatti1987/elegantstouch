'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    month: 'Jan',
    users: 100,
  },
  {
    month: 'Feb',
    users: 250,
  },
  {
    month: 'Mar',
    users: 400,
  },
  {
    month: 'Apr',
    users: 650,
  },
  {
    month: 'May',
    users: 900,
  },
];

export default function UserGrowthChart() {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold">User Growth</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area dataKey="users" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
