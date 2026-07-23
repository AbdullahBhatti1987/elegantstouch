'use client';

import { useCart } from '@/context/CartContext';
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
}) {
  const router = useRouter();

  // const checkProductInCart = (productId) => {
  //   console.log('CURRENT CART:', cart);

  //   const result = cart?.items?.some(
  //     (item) =>
  //       String(item.productId?._id || item.productId) ===
  //       String(productId),
  //   );

  //   console.log('PRODUCT ID:', productId, 'RESULT:', result);

  //   return result;
  // };

  return (
    <section className="min-w-0 flex-1">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm dark:bg-zinc-900">
        <div>
          <h2 className="text-xl font-bold">Products</h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} products available
          </p>
        </div>

        <select
          value={sort}

          onChange={(e) => setSort(e.target.value)}

          className="rounded-xl border px-4 py-2 text-sm outline-none dark:bg-zinc-800"
        >
          <option value="default">Sort By</option>

          <option value="low">Price Low to High</option>

          <option value="high">Price High to Low</option>
        </select>
      </div>

      {/* Product Grid */}

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
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
              onClick={() => router.push(`/products/${product._id}`)}
              isInCart={isInCart(product._id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
