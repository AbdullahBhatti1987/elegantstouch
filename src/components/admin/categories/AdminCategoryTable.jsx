'use client';

import Image from 'next/image';
import { Star,  CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AdminCategoryTableSkeleton from '../common/skeleton/AdminCategoryTableSkeleton';
import EmptyCategoryState from './EmptyCategoryState';

export default function AdminCategoryTable({ categories, loading }) {
  const router = useRouter();

  return (
    <div className="w-full max-w-full overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full table-fixed text-xs md:text-sm">
        <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
          <tr className="h-10 md:h-12">
            <th className="w-[60px] px-2 text-center font-semibold md:w-[70px]">
              Image
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Category
            </th>
            <th className="hidden px-2 text-left align-middle font-semibold md:table-cell ">
              Description
            </th>
            {/* <th className="hidden px-2 text-left font-semibold md:block md:px-4">
              Description
            </th> */}

            <th className="px-2 text-left font-semibold md:px-4">
              Slug
            </th>

            {/* <th className="px-2 text-left font-semibold md:px-4">
              Products
            </th> */}

            <th className="px-2 text-left font-semibold md:px-4">
              Status
            </th>

            <th className="px-2 text-center font-semibold md:px-4">
              Featured
            </th>

            <th className="px-2 text-left font-semibold md:px-4">
              Created
            </th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <AdminCategoryTableSkeleton rows={4} />
          ) : (
            categories.length > 0 ? categories.map((category) => (
              <tr
                key={category._id}
                onClick={() =>
                  router.push(`/dashboard/categories/${category._id}`)
                }
                className="h-14 border-b transition hover:bg-blue-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* IMAGE */}

                <td className="w-12 px-2 py-2 md:max-w-16 md:px-4">
                  <div className="relative h-9 w-9 overflow-hidden rounded-lg border md:h-10 md:w-10">
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

                {/* <td className="px-2 py-2 md:px-4">
                  <div className="max-w-[120px] md:max-w-xs">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </p>

                    <p className="line-clamp-2 hidden text-xs text-gray-500 md:block">
                      {category.description}
                    </p>
                  </div>
                </td> */}

                <td className="px-2 py-2 md:px-4">
                  <div className="max-w-[120px] md:w-[120px]">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {category.name}
                    </p>
                  </div>
                </td>
                <td className="hidden px-2 py-2 md:table-cell md:px-2">
                  <div className="">
                    <p
                      className="text-xs text-gray-500"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {category.description}
                    </p>
                  </div>
                </td>

                {/* SLUG */}

                <td className="px-2 md:table-cell md:px-4">
                  {category.slug}
                </td>

                {/* PRODUCTS */}

                {/* <td className="px-2 py-2 md:px-4">
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    <Package size={13} />

                    {category.productCount || 0}
                  </span>
                </td> */}

                {/* STATUS */}

                <td className="px-2 py-2 md:px-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold md:text-xs ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {category.status}
                  </span>
                </td>

                {/* FEATURED */}

                <td className="px-4 text-center">
                  {category.featured ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-[10px] font-semibold text-yellow-700 md:text-xs">
                      <Star size={13} fill="currentColor" />
                      Yes
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">No</span>
                  )}
                </td>

                {/* CREATED */}

                <td className="px-2 py-2 md:px-4">
                  <div className="flex items-center gap-1 text-[10px] text-gray-500 md:text-xs">
                    <CalendarDays size={12} />

                    {new Date(
                      category.createdAt,
                    ).toLocaleDateString()}
                  </div>
                </td>
              </tr>
            )): <EmptyCategoryState />
          )}
        </tbody>
      </table>
    </div>
  );
}
