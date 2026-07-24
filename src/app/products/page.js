'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import ProductCard from '@/components/products/ProductCard';
import PageLoader from '@/components/admin/common/loaders/PageLoader';
import Pagination from '@/components/admin/common/Pagination';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [pagination, setPagination] = useState({});
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();
  const fetchProducts = useCallback(
    async (currentPage = 1) => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/products?page=${currentPage}&limit=${limit}`,
        );

        if (data.success) {
          setProducts(data.data);

          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Products Fetch Error:', error);
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchProducts(page);
  }, [fetchProducts, page]);

  // Wishlist Toggle

  const handlePageChange = (newPage) => {
    setPage(newPage);

    fetchProducts(newPage);
  };

  return (
    <section className="w-full max-w-7xl m-auto bg-white px-6 py-4 md:px-12 dark:bg-black">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
         Products
        </h2>

        <p className="mt-2 text-gray-500">
          Best collections curated just for you
        </p>
      </div>

      {/* Product Grid */}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showWishlistButton={true}
              addToWishlist={addToWishlist}
              isInWishlist={isInWishlist(product._id)}
              removeFromWishlist={removeFromWishlist}
              addToCart={addToCart}
              isInCart={isInCart(product._id)}
              showCartButton={true}
              showRating={true}
              onClick={() => router.push(`/products/${product.slug}`)}
            />
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* Pagination */}

      <div className="mt-10 flex justify-center">
        <Pagination
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
