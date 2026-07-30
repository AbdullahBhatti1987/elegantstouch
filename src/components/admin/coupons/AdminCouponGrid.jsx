// 'use client';

// import Loader from '@/components/admin/common/loaders/Loader';
// import AdminCouponCard from './AdminCouponCard';
// import EmptyState from '../common/emptyState/EmptyState';

// export default function AdminCouponGrid({ coupons = [], loading }) {
//   return (
//     <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
//       {loading ? (
//         <Loader type='couponGrid' count={8} />
//       ) : coupons.length > 0 ? (
//         coupons.map((coupon) => (
//           <AdminCouponCard key={coupon._id} coupon={coupon} />
//         ))
//       ) : (
//         <div className="col-span-full">
//           <EmptyState
//             title="No Coupons Found"
//             description="There are currently no coupons available. Coupon information will appear here when you create discount offers."
//             action={
//               <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
//                 Clear Filters
//               </button>
//             }
//           />
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminCouponCard from './AdminCouponCard';
import EmptyState from '../common/emptyState/EmptyState';

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
        <div className="col-span-full">
          <EmptyState
            title="No Coupons Found"
            description="There are currently no coupons available. Coupon information will appear here when you create discount offers."
            action={
              <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                Clear Filters
              </button>
            }
          />
        </div>
      )}
    </div>
  );
}
