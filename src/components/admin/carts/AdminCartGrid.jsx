'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminCartCard from './AdminCartCard';
import EmptyState from '../common/emptyState/EmptyState';

export default function AdminCartGrid({ carts = [], loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader type={'cartGrid'} count={8} />
      ) : carts.length > 0 ? (
        carts.map((cart) => (
          <AdminCartCard key={cart._id} cart={cart} />
        ))
      ) : (
        <EmptyState
          title="No Carts Found"
          description="There are currently no customer carts available. Cart information will appear here when customers add products."
          action={
            <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              Clear Filters
            </button>
          }
        />
      )}
    </div>
  );
}
