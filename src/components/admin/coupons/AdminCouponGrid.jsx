'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminCouponCard from './AdminCouponCard';
import EmptyCouponState from './EmptyCouponState';

export default function AdminCouponGrid({ coupons = [], loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader count={8} />
      ) : coupons.length > 0 ? (
        coupons.map((coupon) => (
          <AdminCouponCard key={coupon._id} coupon={coupon} />
        ))
      ) : (
        <EmptyCouponState />
      )}
    </div>
  );
}
