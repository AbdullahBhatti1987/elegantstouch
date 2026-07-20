'use client';

import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Package,
  CalendarDays,
  User,
  Banknote,
} from 'lucide-react';

export default function AdminCartCard({ cart }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/carts/${cart._id}`)}

      className="group cursor-pointer rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* TOP SECTION */}

      <div className="flex gap-3">
        {/* USER ICON */}

        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
          <User size={32} className="text-blue-600" />
        </div>

        {/* CUSTOMER INFO */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {cart.user?.name || 'Guest User'}
          </h3>

          <p className="mt-1 truncate text-xs text-gray-500">
            {cart.user?.email || '-'}
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              cart.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700'
            } `}
          >
            {cart.status}
          </span>
        </div>
      </div>

      {/* CART STATS */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* PRODUCTS */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Package size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {cart.items?.length || 0}
          </p>

          <span className="text-[10px] text-gray-500">Products</span>
        </div>

        {/* QUANTITY */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <ShoppingCart size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {cart.totalItems || 0}
          </p>

          <span className="text-[10px] text-gray-500">Qty</span>
        </div>

        {/* AMOUNT */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Banknote size={12} className="text-gray-500" />

          <p className="mt-1 truncate text-xs font-bold">
            {cart.totalAmount || 0}
          </p>

          <span className="text-[10px] text-gray-500">PKR</span>
        </div>
      </div>

      {/* PRODUCTS PREVIEW */}

      <div className="mt-3">
        <p className="mb-1 text-xs font-semibold text-gray-700 dark:text-gray-300">
          Cart Items
        </p>

        <div className="flex gap-1 overflow-hidden">
          {cart.items?.slice(0, 3).map((item) => (
            <span
              key={item._id}
              className="rounded-full bg-gray-50 px-2 py-1 text-[10px] whitespace-nowrap text-gray-600 dark:bg-blue-900/30"
            >
              {item.product?.name || 'Product'}
            </span>
          ))}
        </div>
      </div>

      {/* CART AGE */}

      <div className="mt-3 flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-[10px] text-gray-600 dark:bg-gray-800">
          <CalendarDays size={11} />
          {cart.cartAge || 0} Days
        </span>
      </div>
    </div>
  );
}
