'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function CategoryCard({ category }) {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-zinc-900"
    >
      {/* IMAGE */}

      <div className="relative h-52 overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
        )}

        <Image
          src={category.image.url || '/images/placeholder.jpg'}

          alt={category.alt || category.name}

          fill

          sizes="
          (max-width:640px) 50vw,
          (max-width:1024px) 33vw,
          25vw
          "

          onLoad={() => setImageLoading(false)}

          className="object-cover transition duration-500 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <h2 className="absolute bottom-5 left-5 text-xl font-bold text-white capitalize">
          {category.name}
        </h2>
      </div>

      {/* CONTENT */}

      {/* <div className="p-5">
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {category.description || 'Explore our latest collection'}
        </p> */}

        {/* <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-medium text-black dark:text-white">
            View Products
          </span>

          <span className="text-lg transition group-hover:translate-x-1">
            →
          </span>
        </div> */}
      {/* </div> */}
    </Link>

   
  );
}
