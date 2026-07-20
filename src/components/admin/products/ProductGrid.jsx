'use client';

import AdminProductCard from './AdminProductCard';
import Loader from '@/components/admin/common/loaders/Loader';
import EmptyState from './EmptyState';

export default function ProductGrid({ products = [], loading }) {
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <Loader count={8} imageHeight="h-48" />
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <AdminProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Products Available"
          description="We couldn't find any products matching your search criteria."
          action={
            <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
              Clear Filters
            </button>
          }
        />
      )}
    </>
  );
}
