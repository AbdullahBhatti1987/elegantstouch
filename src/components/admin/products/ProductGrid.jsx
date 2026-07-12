'use client';

import AdminProductCard from './AdminProductCard';

export default function ProductGrid({ products, loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <AdminProductCard
          key={product._id}
          product={product}
         
        />
      ))}
    </div>
  );
}
