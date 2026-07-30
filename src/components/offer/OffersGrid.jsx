'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductCard from '../products/ProductCard';

export default function OffersGrid({ onEmpty }) {
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  const fetchOffers = useCallback(async (pageNumber) => {
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
  }, []);

  useEffect(() => {
    fetchOffers(1);
  }, [fetchOffers]);

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
        threshold: 1,
      },
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.disconnect();
      }
    };
  }, [page, hasMore, loading, fetchOffers]);

  if (!products.length && !loading) {
    return null;
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-10">
        {loading && (
          <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
        )}
      </div>
    </>
  );
}
