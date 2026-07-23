'use client';

import { useRouter } from 'next/navigation';

import {
  TicketPercent,
  Percent,
  CalendarDays,
  Layers,
  BadgeCheck,
} from 'lucide-react';

import AdminCouponTableSkeleton from '../common/skeleton/AdminCouponTableSkeleton';

export default function AdminCouponTable({ coupons = [], loading }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full table-fixed text-xs md:text-sm">
        <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
          <tr className="h-10 md:h-12">
            <th className="w-[60px] px-2 text-center font-semibold">
              #
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Coupon
            </th>

            <th className="hidden px-2 text-left font-semibold md:table-cell md:px-4">
              Discount
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Apply On
            </th>

            <th className="hidden px-2 text-left font-semibold sm:table-cell md:px-4">
              Min Order
            </th>

            <th className="hidden px-2 text-left font-semibold md:table-cell md:px-4">
              Expiry
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <AdminCouponTableSkeleton rows={6} />
          ) : (
            coupons.map((coupon, index) => (
              <tr
                key={coupon._id}

                onClick={() =>
                  router.push(`/dashboard/coupons/${coupon._id}`)
                }

                className="h-14 cursor-pointer border-b transition hover:bg-blue-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* INDEX */}

                <td className="px-2 text-center">{index + 1}</td>

                {/* COUPON CODE */}

                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/30">
                      <TicketPercent size={14} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate font-semibold">
                        {coupon.code}
                      </p>

                      <p className="text-[10px] text-gray-500">
                        Used {coupon.usedCount || 0}
                      </p>
                    </div>
                  </div>
                </td>

                {/* DISCOUNT */}

                <td className="hidden px-2 md:table-cell md:px-4">
                  <div className="flex items-center gap-1">
                    <Percent size={14} />

                    <span className="font-semibold">
                      {coupon.value}

                      {coupon.discountType === 'percentage'
                        ? '%'
                        : ' PKR'}
                    </span>
                  </div>
                </td>

                {/* APPLY TYPE */}

                <td className="px-2 md:px-4">
                  <div className="flex items-center gap-1">
                    <Layers size={14} />

                    <span className="capitalize">
                      {coupon.applyType === 'all'
                        ? 'All'
                        : coupon.applyType}
                    </span>
                  </div>
                </td>

                {/* MIN ORDER */}

                <td className="hidden px-2 sm:table-cell md:px-4">
                  PKR {coupon.minOrderAmount || 0}
                </td>

                {/* EXPIRY */}

                <td className="hidden px-2 md:table-cell md:px-4">
                  <div className="flex items-center gap-1 text-gray-500">
                    <CalendarDays size={13} />

                    {coupon.expiryDate
                      ? new Date(
                          coupon.expiryDate,
                        ).toLocaleDateString()
                      : '-'}
                  </div>
                </td>

                {/* STATUS */}

                <td className="px-2 md:px-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                      coupon.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {coupon.status}
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
