'use client';

import CategoryCard from '@/components/client/categories/CategoryCard';
import PageLoader from '@/components/common/PageLoader';
import CategoryCardSkeleton from '@/components/common/skeletons/CategoryCardSkeleton';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    console.log('Fetching Categories...');
    try {
      const res = await fetch('/api/categories');

      const data = await res.json();
      console.log('Categories fetched:', data);

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    setTimeout(() => {
      getCategories();
      
    }, 2000);
  }, []);

  if (loading) {
    return (
      <PageLoader />
    );
  }

  return (
    <main className="min-h-screen w-full bg-white px-6 py-12 md:px-12 dark:bg-zinc-950">
      {/* Header */}

      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 md:text-5xl dark:text-white">
          Shop by Categories
        </h1>

        <p className="mt-2 text-gray-500">
          Explore all product categories
        </p>
      </div>

      {/* Categories Grid */}

      <div className="grid grid-cols-2  gap-6 md:grid-cols-3 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))
          : categories.map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
      </div>
    </main>
  );
}
