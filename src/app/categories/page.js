'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import CategoryCard from '@/components/category/CategoryCard';
import CategoryCardSkeleton from '@/components/category/CategoryCardSkeleton';
import SectionHeader from '@/components/common/SectionHeader';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);

  const loaderRef = useRef(null);
  const scrollRef = useRef(null);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 8,
  });

  const fetchCategories = useCallback(async (currentPage = 1) => {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const { data } = await axios.get(
        `/api/categories?page=${currentPage}&limit=8`,
      );

      if (data.success) {
        if (currentPage === 1) {
          setCategories(data.data);
        } else {
          setCategories((prev) => [...prev, ...data.data]);
        }

        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Categories Fetch Error:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories(page);
  }, [page, fetchCategories]);

  // Infinite Scroll

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          pagination.hasNextPage &&
          !loadingMore
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.5,
      },
    );

    const element = loaderRef.current;

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [pagination.hasNextPage, loadingMore]);

  return (
    <section className="flex h-[calc(100vh-80px)] w-full flex-col overflow-hidden bg-white px-6 md:px-12 dark:bg-black">
      <div
        ref={scrollRef}
        className="scrollbar-hide mx-auto flex h-full w-full max-w-7xl flex-col overflow-y-auto py-4"
      >
        <SectionHeader
          // icon={Tag}
          title="Categories"
          description="Best collections curated just for you."
        />

        <div className="flex-1 pr-2">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {loading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <CategoryCardSkeleton key={index} />
              ))
            ) : categories.length > 0 ? (
              [...categories]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category) => (
                  <CategoryCard
                    key={category._id}
                    category={category}
                  />
                ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No categories found
              </p>
            )}
          </div>

          {/* Loader Trigger */}

          <div
            ref={loaderRef}
            className="flex h-20 items-center justify-center"
          >
            {loadingMore && (
              <div className="flex items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white" />

                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Loading more categories...
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
