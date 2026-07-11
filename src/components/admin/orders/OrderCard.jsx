'use client';

import { Eye, Edit, Trash2 } from 'lucide-react';

export default function OrderCard({
  order,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-xl border bg-white p-4 dark:bg-gray-900">
      <div className="flex justify-between">
        <h3 className="font-semibold">{order.id}</h3>

        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs">
          {order.status}
        </span>
      </div>

      <div className="mt-3 text-sm">
        <p>
          Customer:
          <b className="ml-1">{order.customer}</b>
        </p>

        <p>
          Products:
          <b className="ml-1">{order.products.length}</b>
        </p>

        <p>
          Total:
          <b className="ml-1">
            {order.total} {order.currency}
          </b>
        </p>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onView(order)}
          className="flex flex-1 justify-center gap-2 rounded-lg border py-2"
        >
          <Eye size={16} />
          View
        </button>

        <button
          onClick={() => onEdit(order)}
          className="rounded-lg border px-3"
        >
          <Edit size={16} />
        </button>

        <button
          onClick={() => onDelete(order.id)}
          className="rounded-lg border px-3 text-red-600"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
