'use client';

import AdminProductCard from './AdminProductCard';
import Loader from '@/components/common/Loader';

export default function ProductGrid({ products = [], loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

      {/* Loading Skeleton */}
      {loading ? (
        <Loader count={8} imageHeight="h-48" />
      ) : products.length > 0 ? (

        /* Products */
        products.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
          />
        ))

      ) : (

        /* Empty State */
        <div className="col-span-full flex min-h-60 items-center justify-center rounded-xl border bg-white dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            No Products Available
          </p>
        </div>

      )}

    </div>
  );
}