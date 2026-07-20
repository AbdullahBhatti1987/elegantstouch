'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, CalendarDays, Tag, Package } from 'lucide-react';

export default function AdminCategoryCard({ category, counts }) {
  const router = useRouter();

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"

      onClick={() =>
        router.push(`/dashboard/categories/${category._id}`)
      }
    >
      {/* Top Section */}

      <div className="flex gap-3">
        {/* Image Square */}

        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          {category?.image ? (
            <Image
              src={category.image.thumbnail}
              alt={category.alt || category.name}
              fill
              sizes="96px"
              className="object-cover transition group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-xs">
              No Image
            </div>
          )}

          {category.featured && (
            <div className="absolute top-1 left-1 rounded-full bg-yellow-400 p-1">
              <Star size={11} fill="black" />
            </div>
          )}
        </div>

        {/* Basic Info */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {category.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
            <Tag size={12} />
            {category.slug}
          </div>

          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              category.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } `}
          >
            {category.status}
          </span>
        </div>
      </div>

      {/* Description */}

      <p className="mt-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
        {category.description}
      </p>

      {/* Details Grid */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Package size={12} className="text-gray-500" />

          {/* <p className="mt-1 text-xs font-bold">
            {counts.categoryWiseProducts?.categoryId === category._id ? counts.categoryWiseProducts?.productCount : 0}
          </p> */}

          <p className="mt-1 text-xs font-bold">
            {counts.categoryWiseProducts?.find(
              (item) => item.categoryId === category._id,
            )?.productCount || 0}
          </p>

          <span className="text-[10px] text-gray-500">Products</span>
        </div>

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Tag size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {category.keywords?.length || 0}
          </p>

          <span className="text-[10px] text-gray-500">Keywords</span>
        </div>

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <CalendarDays size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {category.sortOrder}
          </p>

          {/* <p className="mt-1 text-xs font-bold">
            {counts.orders?.find(
              (item) => item.categoryId === category._id,
            )?.productCount || 0}
          </p> */}

          <span className="text-[10px] text-gray-500">Order</span>
        </div>
      </div>

      {/* Keywords */}

      <div className="mt-3 flex gap-1 overflow-hidden">
        {category.keywords?.slice(0, 3).map((item, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-50 px-2 py-1 text-[10px] whitespace-nowrap text-gray-600 dark:bg-blue-900/30"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
