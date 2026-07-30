'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductCard from '../products/ProductCard';
import ProductCardSkeleton from '../products/ProductCardSkeleton';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function OffersGrid({ onEmpty }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();
  const { addToCart, isInCart } = useCart();

  const loaderRef = useRef(null);
  const fetchOffers = useCallback(
    async (pageNumber) => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/flash-sale/active?page=${pageNumber}&limit=12`,
        );

        if (data.success && data.data) {
          if (data.data.products.length === 0) {
            onEmpty();

            return;
          }

          setProducts((prev) =>
            pageNumber === 1
              ? data.data.products
              : [...prev, ...data.data.products],
          );

          setHasMore(data.data.pagination.hasMore);
        }
      } catch (error) {
        console.log('Offers Error', error);
      } finally {
        setLoading(false);
      }
    },
    [onEmpty],
  );

  useEffect(() => {
    fetchOffers(1);
  }, [fetchOffers]);

  // Infinite Scroll

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;

          setPage(nextPage);

          fetchOffers(nextPage);
        }
      },
      {
        threshold: 0,
      },
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, hasMore, loading, fetchOffers]);

  return (
    <>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {loading && products.length === 0
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                isInWishlist={isInWishlist(product._id)}
                addToCart={addToCart}
                isInCart={isInCart(product._id)}
                loading={loading}
                // onClick={() => router.push(`/products/${product._id}`)}
              />
            ))}
      </div>

      {/* Load More Loader */}

      <div ref={loaderRef} className="flex justify-center py-10">
        {loading && products.length > 0 && (
          <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
        )}
      </div>
    </>
  );
}
