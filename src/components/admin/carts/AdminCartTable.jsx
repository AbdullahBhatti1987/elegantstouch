'use client';

import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  CalendarDays,
  Package,
  User,
} from 'lucide-react';

import AdminCartTableSkeleton from '../common/skeleton/AdminCartTableSkeleton';

export default function AdminCartTable({ carts, loading }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full table-fixed text-xs md:text-sm">
        <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
          <tr className="h-10 md:h-12">
            <th className="w-[60px] px-2 text-center font-semibold md:w-[70px]">
              #
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Customer
            </th>

            <th className="hidden px-2 text-left font-semibold md:table-cell md:px-4">
              Products
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Items
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Amount
            </th>

            <th className="hidden px-2 text-left font-semibold sm:table-cell md:px-4">
              Cart Age
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <AdminCartTableSkeleton rows={6} />
          ) : (
            carts.map((cart, index) => (
              <tr
                key={cart._id}

                onClick={() =>
                  router.push(`/dashboard/carts/${cart._id}`)
                }

                className="h-14 cursor-pointer border-b transition hover:bg-blue-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* INDEX */}

                <td className="px-2 text-center">{index + 1}</td>

                {/* CUSTOMER */}

                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <User size={14} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {cart.user?.name || 'Guest'}
                      </p>

                      <p className="truncate text-[10px] text-gray-500">
                        {cart.user?.email || '-'}
                      </p>
                    </div>
                  </div>
                </td>

                {/* PRODUCTS */}

                <td className="hidden px-2 md:table-cell md:px-4">
                  <div className="flex items-center gap-1">
                    <Package size={14} />

                    <span>{cart.items?.length || 0} Products</span>
                  </div>
                </td>

                {/* TOTAL ITEMS */}

                <td className="px-2 md:px-4">
                  <div className="flex items-center gap-1">
                    <ShoppingCart size={14} />

                    {cart.totalItems || 0}
                  </div>
                </td>

                {/* AMOUNT */}

                <td className="px-2 font-semibold md:px-4">
                  PKR {cart.totalAmount || 0}
                </td>

                {/* CART AGE */}

                <td className="hidden px-2 sm:table-cell md:px-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <CalendarDays size={13} />

                    <span>{cart.cartAge || 0} days</span>
                  </div>
                </td>

                {/* STATUS */}

                <td className="px-2 md:px-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      cart.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    } `}
                  >
                    {cart.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
