'use client';

import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';

export default function CategoryProductList({
  filteredProducts = [],
  loading,
  sort,
  setSort,
  addToCart,
  addToWishlist,
  isInWishlist,
  isInCart,
  removeFromWishlist,
  categoryName,
}) {
  const router = useRouter();

  return (
    <section className="min-w-0 flex-1">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm dark:bg-zinc-900">
        <div>
          <h2 className="text-lg font-bold">
            {categoryName || 'Products'}
          </h2>

          <p className="text-xs text-gray-500">
            {filteredProducts.length} items
          </p>
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border px-3 py-1.5 text-sm outline-none dark:bg-zinc-800"
        >
          <option value="default">Sort</option>

          <option value="low">Price Low</option>

          <option value="high">Price High</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="hide-scrollbar grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl bg-gray-200 dark:bg-zinc-800"
            />
          ))
        ) : filteredProducts.length === 0 ? (
          <p className="col-span-full py-20 text-center text-gray-500">
            No products found
          </p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}

              product={product}

              addToWishlist={addToWishlist}

              removeFromWishlist={removeFromWishlist}

              isInWishlist={isInWishlist(product._id)}

              addToCart={addToCart}

              isInCart={isInCart(product._id)}
              loading={loading}
              onClick={() => router.push(`/products/${product._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
}
