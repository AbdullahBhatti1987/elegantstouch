'use client';

import Image from 'next/image';
import AdminCategoryTableSkeleton from '../common/skeleton/AdminCategoryTableSkeleton';

export default function AdminCategoryTable({ categories, loading }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50 dark:bg-gray-800">
          <tr className="h-14 w-full">
            <th className="p-4 text-left">Image</th>

            <th className="p-4 text-left">Name</th>

            <th className="p-4 text-left">Slug</th>

            <th className="p-4 text-left">Products</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Featured</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <AdminCategoryTableSkeleton rows={8} />
          ) : (
            categories.map((category) => (
              <tr
                key={category.id}
                className="h-14 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {/* Image */}
                <td className="p-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                    <Image
                      src={
                        category.image || '/images/placeholder.jpg'
                      }
                      alt={category.alt || category.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* Name */}
                <td className="p-4 font-medium whitespace-nowrap">
                  {category.name}
                </td>

                {/* Slug */}
                <td className="p-4 whitespace-nowrap text-gray-500">
                  {category.slug}
                </td>

                {/* Products */}
                <td className="p-4 whitespace-nowrap">
                  {category.productCount || 0}
                </td>

                {/* Status */}
                <td className="p-4 whitespace-nowrap">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      category.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    } `}
                  >
                    {category.status}
                  </span>
                </td>

                {/* Featured */}
                <td className="p-4 text-center">
                  {category.featured ? ' Yes' : 'No'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
