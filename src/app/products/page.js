'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import ProductCard from '@/components/products/ProductCard';
import PageLoader from '@/components/admin/common/loaders/PageLoader';
import Pagination from '@/components/admin/common/Pagination';
import { useCart } from '@/context/CartContext';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [pagination, setPagination] = useState({});
  const router = useRouter();
  const { addToCart, isInCart } = useCart();

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

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    fetchProducts(newPage);
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 dark:bg-black">
      {/* Header */}

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Elegant's Touch
        </h2>

        <p className="mt-2 text-gray-500">
          Best collections curated just for you
        </p>
      </div>

      {/* Product Grid */}

      <div className="grid gap-4 grid-cols-2  md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              isInCart={isInCart(product._id)}
              showCartButton={true}
              showRating={true}
              onClick={() => router.push(`/products/${product.slug}`)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
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
