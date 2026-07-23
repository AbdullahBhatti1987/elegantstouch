'use client';

import { Ticket } from 'lucide-react';

export default function EmptyCouponState() {
  return (
    <div className="col-span-full flex flex-col items-center justify-center rounded-xl border p-10 text-center">
      <Ticket size={50} className="text-gray-400" />

      <h3 className="mt-4 text-lg font-semibold">No Coupons Found</h3>

      <p className="text-sm text-gray-500">
        Create your first discount coupon
      </p>
    </div>
  );
}
