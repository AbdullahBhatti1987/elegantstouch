'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import FeatureCard from '../category/FeaturedCard';
import FeatureCardSkeleton from '../category/FeatureCardSkeleton';

export default function CategoriesFeatured() {
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        '/api/categories?featured=true',
      );

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
    <section className="w-full bg-white px-6 py-16 md:px-12 dark:bg-black">
      {/* Header */}

      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Explore Categories
        </h2>

        <p className="mt-2 text-gray-500">
          Best collections curated just for you
        </p>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {loading ? (
          [...Array(4)].map((_, index) => (
            <FeatureCardSkeleton key={index} />
          ))
        ) : categories.length > 0 ? (
          categories.slice(0, 4).map((category) => (
            <FeatureCard key={category._id} category={category} />
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
