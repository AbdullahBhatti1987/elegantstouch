'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'Hair Accessories',
    value: 400,
  },
  {
    name: 'Jewellery',
    value: 300,
  },
  {
    name: 'Kids',
    value: 200,
  },
  {
    name: 'Others',
    value: 100,
  },
];

export default function SalesCategoryChart() {
  return (
    <div className="rounded-xl bg-white p-5 shadow dark:bg-gray-900">
      <h2 className="mb-5 text-lg font-semibold">
        Sales By Category
      </h2>

      <ResponsiveContainer height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
          >
            {data.map((item, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
