'use client';

import Image from 'next/image';
import { Star, Package, Tag, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminCategoryTableSkeleton from '../common/skeleton/AdminCategoryTableSkeleton';

export default function AdminCategoryTable({ categories, loading }) {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
          <tr className="h-12">
            <th className="px-4 text-left font-semibold">Image</th>

            <th className="px-4 text-left font-semibold">Category</th>

            <th className="px-4 text-left font-semibold">Slug</th>

            <th className="px-4 text-left font-semibold">Products</th>

            <th className="px-4 text-left font-semibold">Status</th>

            <th className="px-4 text-center font-semibold">
              Featured
            </th>

            <th className="px-4 text-left font-semibold">Created</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <AdminCategoryTableSkeleton rows={4} />
          ) : (
            categories.map((category) => (
              <tr
                key={category._id}
                onClick={() =>
                  router.push(`/dashboard/categories/${category._id}`)
                }
                className="h-16 border-b transition hover:bg-blue-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* IMAGE */}

                <td className="px-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg border">
                    <Image
                      src={category.image.url}

                      alt={category.alt || category.name}
                      fill
                      priority
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* CATEGORY */}

                <td className="px-4">
                  <div className="max-w-xs">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </p>

                    <p className="line-clamp-1 text-xs text-gray-500">
                      {category.description}
                    </p>
                  </div>
                </td>

                {/* SLUG */}

                <td className="px-4">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Tag size={14} />

                    {category.slug}
                  </div>
                </td>

                {/* PRODUCTS */}

                <td className="px-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    <Package size={13} />

                    {category.productCount || 0}
                  </span>
                </td>

                {/* STATUS */}

                <td className="px-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    } `}
                  >
                    {category.status}
                  </span>
                </td>

                {/* FEATURED */}

                <td className="px-4 text-center">
                  {category.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                      <Star size={13} fill="currentColor" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">No</span>
                  )}
                </td>

                {/* CREATED */}

                <td className="px-4">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <CalendarDays size={14} />

                    {new Date(
                      category.createdAt,
                    ).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
