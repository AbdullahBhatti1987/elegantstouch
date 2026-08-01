'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { FolderTree } from 'lucide-react';

export default function CategoryMegaMenu() {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const MAX_CATEGORIES = 10;

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories/dropdown');

      if (data.success) {
        setCategories(data.data);

        setActiveCategory(data.data[0]);
      }
    } catch (error) {
      console.log('Category menu error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="w-[720px] rounded-xl bg-white p-5 shadow-xl">
        Loading...
      </div>
    );
  }

  const visibleCategories = categories.slice(0, MAX_CATEGORIES);

  const showOthers = categories.length > MAX_CATEGORIES;

  return (
    <div className="flex w-[720px] max-w-[calc(100vw-24px)] overflow-hidden rounded-2xl border bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* Categories */}

      <div className="grid w-[68%] grid-cols-2 content-start gap-x-8 gap-y-1 p-4">
        <Link
          href="/categories"
          className="group flex items-center rounded-md px-2 py-2 text-sm font-semibold whitespace-nowrap text-[#005b96] transition-all hover:bg-[#005b96]/5 dark:text-cyan-400"
        >
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#005b96] after:to-cyan-400 after:transition-all group-hover:after:w-full">
            All Categories →
          </span>
        </Link>

        {visibleCategories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category._id}`}
            onMouseEnter={() => setActiveCategory(category)}
            className="group flex items-center rounded-md px-2 py-2 text-sm font-medium whitespace-nowrap text-zinc-700 transition-all duration-300 hover:bg-[#005b96]/5 hover:text-[#005b96] dark:text-zinc-200 dark:hover:text-cyan-400"
          >
            <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-gradient-to-r after:from-[#005b96] after:to-cyan-400 after:transition-all after:duration-300 group-hover:after:w-full">
              {category.name}
            </span>
          </Link>
        ))}

        {showOthers && (
          <Link
            href="/categories"
            className="rounded-md px-2 py-2 text-sm font-semibold text-[#005b96] transition hover:bg-[#005b96]/5 dark:text-cyan-400"
          >
            View All Categories →
          </Link>
        )}
      </div>

      {/* Image */}

      <div className="relative min-h-[230px] w-[32%] bg-gray-100 dark:bg-zinc-800">
        {activeCategory?.image ? (
          <Image
            src={activeCategory.image}

            alt={activeCategory.name}

            fill

            sizes="240px"

            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <FolderTree />
          </div>
        )}

        <div className="absolute right-3 bottom-3 left-3 rounded-lg bg-black/50 px-3 py-2 text-center text-xs font-semibold text-white backdrop-blur">
          {activeCategory?.name}
        </div>
      </div>
    </div>
  );
}
