'use client';

import {
  Eye,
  Edit,
  Trash2,
  Package,
  CreditCard,
  CalendarDays,
  User,
} from 'lucide-react';
import Link from 'next/link';

export default function OrderCard({
  order,
  onEdit,
  onDelete,
}) {
  return (
    <Link
      href={`/dashboard/orders/${order._id}`}
    className="group rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Top Section */}

      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
            #{order.orderNumber || order._id}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <User size={12} />

            {order.customer?.name || 'Guest'}
          </div>
        </div>

        {/* Order Status */}

        <span
          className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
            order.orderStatus === 'delivered'
              ? 'bg-green-100 text-green-700'
              : order.orderStatus === 'cancelled'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
          } `}
        >
          {order.orderStatus}
        </span>
      </div>

      {/* Details */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* Total */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-[10px] text-gray-500">Total</p>

          <p className="mt-1 text-xs font-bold">
            {order.totalAmount} {order.currency}
          </p>
        </div>

        {/* Items */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <div className="flex items-center gap-1">
            <Package size={12} />

            <span className="text-[10px] text-gray-500">Items</span>
          </div>

          <p className="mt-1 text-xs font-bold">
            {order.items?.length || 0}
          </p>
        </div>

        {/* Payment */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <div className="flex items-center gap-1">
            <CreditCard size={12} />

            <span className="text-[10px] text-gray-500">Payment</span>
          </div>

          <p className="mt-1 truncate text-xs font-bold">
            {order.paymentStatus}
          </p>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-3 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarDays size={13} />

          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : '-'}
        </div>

        <span>{order.paymentMethod}</span>
      </div>

      {/* Actions */}

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onView(order)}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Eye size={14} />
          View
        </button>

        <button
          onClick={() => onEdit(order)}
          className="rounded-lg border px-3 transition hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Edit size={15} />
        </button>

        <button
          onClick={() => onDelete(order._id)}
          className="rounded-lg border px-3 text-red-600 transition hover:bg-red-100"
        >
          <Trash2 size={15} />
        </button>
      </div>
    </Link>
  );
}
