'use client';

import { useRouter } from 'next/navigation';

import {
  TicketPercent,
  CalendarDays,
  Percent,
  Package,
  Layers,
  BadgeCheck,
} from 'lucide-react';

export default function AdminCouponCard({ coupon }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/dashboard/coupons/${coupon._id}`)}

      className="group cursor-pointer rounded-2xl border border-gray-400 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-3 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* HEADER */}

      <div className="flex gap-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30">
          <TicketPercent size={34} className="text-purple-600" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold dark:text-white">
            {coupon.code}
          </h3>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
              coupon.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } `}
          >
            {coupon.status}
          </span>
        </div>
      </div>

      {/* DISCOUNT */}

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <Percent size={14} />

          <p className="mt-1 text-sm font-bold">
            {coupon.value}

            {coupon.discountType === 'percentage' ? '%' : ' PKR'}
          </p>

          <span className="text-xs text-gray-500">Discount</span>
        </div>

        <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <Layers size={14} />

          <p className="mt-1 text-sm font-bold">{coupon.applyType}</p>

          <span className="text-xs text-gray-500">Apply On</span>
        </div>
      </div>

      {/* DETAILS */}

      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Min Order</span>

          <span className="font-semibold">
            Rs. {coupon.minOrderAmount || 0}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Used</span>

          <span className="font-semibold">
            {coupon.usedCount || 0}/{coupon.usageLimit || '∞'}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1 text-gray-500">
            <CalendarDays size={14} />
            Expiry
          </span>

          <span className="font-semibold">
            {coupon.expiryDate
              ? new Date(coupon.expiryDate).toLocaleDateString()
              : '-'}
          </span>
        </div>
      </div>

      {/* APPLY TYPE */}

      <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs dark:bg-gray-800">
        <BadgeCheck size={14} />

        <span>
          {coupon.applyType === 'all'
            ? 'All Products'
            : coupon.applyType === 'products'
              ? 'Specific Product'
              : 'Specific Category'}
        </span>
      </div>
    </div>
  );
}
