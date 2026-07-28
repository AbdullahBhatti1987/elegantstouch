'use client';

import Link from 'next/link';

import { Pencil, Package } from 'lucide-react';

export default function FlashSaleTable({ flashSales, loading }) {
  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!flashSales?.length) {
    return (
      <div className="rounded-xl border p-8 text-center text-gray-500">
        No flash sales found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white dark:border-neutral-700 dark:bg-neutral-900">
      <table className="w-full text-sm">
        <thead className="border-b bg-neutral-50 dark:bg-neutral-800">
          <tr>
            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Products</th>

            <th className="p-4 text-left">Start</th>

            <th className="p-4 text-left">End</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {flashSales.map((sale) => (
            <tr key={sale._id} className="border-b last:border-none">
              <td className="p-4 font-medium">{sale.title}</td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Package size={16} />

                  {sale.products?.length || 0}
                </div>
              </td>

              <td className="p-4">
                {new Date(sale.startTime).toLocaleDateString()}
              </td>

              <td className="p-4">
                {new Date(sale.endTime).toLocaleDateString()}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    sale.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  } `}
                >
                  {sale.status}
                </span>
              </td>

              <td className="p-4">
                <Link
                  href={`/dashboard/offers/flash-sale/update/${sale._id}`}

                  className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-xs text-white dark:bg-white dark:text-black"
                >
                  <Pencil size={14} />
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
