'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminCartCard from './AdminCartCard';
import EmptyCartState from './EmptyCartState';

export default function AdminCartGrid({ carts = [], loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader count={8} />
      ) : carts.length > 0 ? (
        carts.map((cart) => (
          <AdminCartCard key={cart._id} cart={cart} />
        ))
      ) : (
        <EmptyCartState />
      )}
    </div>
  );
}
