'use client';

import { Eye, Edit, Trash2 } from 'lucide-react';

export default function OrderTable({
  orders,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
      <table className="w-full table-fixed text-sm">
        <thead className="border-b bg-gray-50 dark:bg-gray-800">
          <tr className="h-14">
            <th className="p-4 text-left">Order ID</th>

            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Items</th>

            <th className="p-4 text-left">Total</th>

            <th className="p-4 text-left">Payment</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="h-14 border-b hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                #{order.orderNumber || order._id}
              </td>

              <td className="p-4">
                {order.customer?.name || 'Guest'}
              </td>

              <td className="p-4">{order.items?.length || 0}</td>

              <td className="p-4">
                {order.totalAmount} {order.currency}
              </td>

              <td className="p-4">{order.paymentMethod}</td>

              <td className="p-4">
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs">
                  {order.orderStatus}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onView(order)}
                    className="rounded p-2 hover:bg-gray-100"
                  >
                    <Eye size={17} />
                  </button>

                  <button
                    onClick={() => onEdit(order)}
                    className="rounded p-2 hover:bg-gray-100"
                  >
                    <Edit size={17} />
                  </button>

                  <button
                    onClick={() => onDelete(order._id)}
                    className="rounded p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
