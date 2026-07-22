'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import CategoryCard from '@/components/category/CategoryCard';
import CategoryCardSkeleton from '@/components/category/CategoryCardSkeleton';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get('/api/categories');

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Categories Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section className="w-full bg-white px-6 py-4 md:px-12 dark:bg-black">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Categories
        </h2>

        <p className="mt-2 text-gray-500">
          Best collections curated just for you
        </p>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {loading ? (
          <>
            {/* Below lg */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="lg:hidden">
                <CategoryCardSkeleton />
              </div>
            ))}

            {/* lg and above */}
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`desktop-${index}`}
                className="hidden lg:block"
              >
                <CategoryCardSkeleton />
              </div>
            ))}
          </>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No categories found
          </p>
        )}
      </div>
    </section>
  );
}
