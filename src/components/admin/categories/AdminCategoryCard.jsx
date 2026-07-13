
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Edit, Package, Star, CalendarDays, Tag } from 'lucide-react';

export default function AdminCategoryCard({ category }) {
  const router = useRouter();

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      {/* Image */}
      <div
        onClick={() =>
          router.push(`/dashboard/categories/${category._id}`)
        }
        className="relative h-52 w-full cursor-pointer overflow-hidden"
      >
        {category?.image ? (
          <Image
            src={category.image}
            alt={category.alt || category.name}
            fill
            sizes="(max-width:640px)100vw,50vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gray-100">
            No Image
          </div>
        )}

        {/* Status */}
        <div className="absolute top-3 left-3">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              category.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } `}
          >
            {category.status}
          </span>
        </div>

        {/* Featured */}
        {category.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
            <Star size={13} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            {category.name}
          </h3>

          <button
            onClick={() =>
              router.push(
                `/dashboard/categories/update/${category._id}`,
              )
            }
            className="rounded-lg border p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Edit size={16} />
          </button>
        </div>

        {/* Slug */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Tag size={15} />
          {category.slug}
        </div>

        {/* Description */}
        <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {category.description}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Package size={15} />
              Products
            </div>

            <p className="mt-1 font-bold">
              {category.productCount || 0}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Tag size={15} />
              Keywords
            </div>

            <p className="mt-1 font-bold">
              {category.keywords?.length || 0}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            {new Date(category.createdAt).toLocaleDateString()}
          </div>

          <span>Order: {category.sortOrder}</span>
        </div>
      </div>
    </div>
  );
}
