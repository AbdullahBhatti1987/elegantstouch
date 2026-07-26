'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminWishlistCard from './AdminWishlistCard';
import EmptyState from '../common/emptyState/EmptyState';

export default function AdminWishlistGrid({
  wishlists = [],
  loading,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader type="wishlistGrid" count={8} />
      ) : wishlists.length > 0 ? (
        wishlists.map((wishlist) => (
          <AdminWishlistCard
            key={wishlist._id}

            wishlist={wishlist}
          />
        ))
      ) : (
        <EmptyState
          title="No Wishlists Found"

          description="
              There are currently no customer wishlists available.
              Wishlist information will appear here when customers save products.
            "

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
