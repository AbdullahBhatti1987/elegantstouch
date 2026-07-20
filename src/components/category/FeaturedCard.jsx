'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeatureCard({ category }) {
  const { slug, name, image, productCount, description } = category;

  return (
    <Link
      href={`/categories/${slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900"
    >
      {/* Image */}

      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={
            image?.thumbnail ||
            image?.url ||
            '/images/default-category.jpg'
          } priority
          alt={image?.alt || name || 'Category image'}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content */}

        <div className="absolute bottom-0 left-0 w-full p-5 text-white">
          <h3 className="text-lg font-bold md:text-xl">{name}</h3>

          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-white/80">
              {description}
            </p>
          )}

          <div className="mt-3 flex items-center justify-between">
            {productCount !== undefined && (
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur">
                {productCount} Products
              </span>
            )}

            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={17} />
            </span>
          </div>
        </div>

        {/* Hover Border */}

        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition group-hover:ring-white/30" />
      </div>
    </Link>
  );
}

