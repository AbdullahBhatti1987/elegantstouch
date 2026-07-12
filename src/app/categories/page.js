'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    console.log('Fetching Categories...');
    try {
      const res = await fetch('/api/categories');

      const data = await res.json();

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
    getCategories();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen w-full bg-gray-50 px-6 py-12 md:px-12 dark:bg-zinc-950">
        <p className="text-center">Loading categories...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gray-50 px-6 py-12 md:px-12 dark:bg-zinc-950">
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

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat._id}

            href={`/categories/${cat.slug}`}

            className="group overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-xl dark:bg-zinc-900"
          >
            {/* Image */}

            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={cat.image || '/images/placeholder.jpg'}
                alt={cat.alt || cat.name}
                width={500}
                height={500}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* Info */}

            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                {cat.name}
              </h2>

              {/* <p className="mt-1 text-sm text-gray-500">
                {cat.productCount || 0} Products
              </p> */}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
