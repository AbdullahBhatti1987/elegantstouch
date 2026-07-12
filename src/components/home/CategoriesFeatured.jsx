'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import CategorySkeleton from '@/components/admin/common/skeleton/CategorySkeleton';

export default function CategoriesFeatured() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      console.log("Response from /api/categories:", response.data); // Log the response data for debugging

      
      if (response.data.success) {

        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="w-full bg-white px-6 py-16 md:px-12 dark:bg-black">
      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Explore Categories & Trending Products
        </h2>

        <p className="mt-2 text-gray-500">
          Best collections curated just for you
        </p>
      </div>

      {/* Categories */}
      <div className="mb-14 grid grid-cols-2 gap-6 md:grid-cols-4">
        {loading
          ? // Skeleton Loading
            [...Array(8)].map((_, index) => (
              <CategorySkeleton key={index} />
            ))
          : // Actual Data
            categories.map((cat) => (
              <Link
                href={`/categories/${cat.slug}`}
                key={cat._id}
                className="group overflow-hidden rounded-xl bg-gray-100 transition hover:shadow-lg dark:bg-zinc-900"
              >
                <div className="relative h-28 w-full">
                  <Image
                    src={cat?.image || '/images/default-category.jpg'}
                    alt={cat?.name || 'Category image not available'}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="p-3 text-center font-medium text-gray-800 dark:text-white">
                  {cat.name}
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}
