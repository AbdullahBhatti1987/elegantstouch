'use client';

import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';

const data = [
  {
    name: 'Hair Bands',
    value: 85,
    fill: '#ec4899',
  },
  {
    name: 'Hair Clips',
    value: 70,
    fill: '#8b5cf6',
  },
  {
    name: 'Jewellery',
    value: 55,
    fill: '#f59e0b',
  },
  {
    name: 'Baby Accessories',
    value: 40,
    fill: '#10b981',
  },
];

export default function CategoryRadialChart() {
  return (
    <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold">
        Category Distribution
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={18}
          data={data}
        >
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="value"
          />

          <Tooltip />

          <Legend
            iconSize={12}
            layout="vertical"
            verticalAlign="left"
            align="left"
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
