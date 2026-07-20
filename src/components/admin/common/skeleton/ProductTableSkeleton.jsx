'use client';

export default function ProductTableSkeleton({ rows = 8 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, index) => (
        <tr
          key={index}
          className="h-16 border-b dark:border-gray-800"
        >
          {/* IMAGE */}
          <td className="px-1 py-1 md:px-3 md:py-3">
            <div className="mx-auto h-10 w-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* PRODUCT */}
          <td className="px-1 py-3 md:px-3">
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </td>

          {/* CATEGORY */}
          <td className="hidden px-1 py-3 sm:table-cell md:px-3">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* BRAND */}
          <td className="hidden px-1 py-3 md:table-cell md:px-3">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* COLLECTION */}
          <td className="hidden px-2 lg:table-cell">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* PRICE */}
          <td className="px-2">
            <div className="space-y-2">
              <div className="h-4 w-14 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-10 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </td>

          {/* STOCK */}
          <td className="px-2">
            <div className="space-y-2">
              <div className="h-4 w-8 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-3 w-6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </td>

          {/* STATUS */}
          <td className="px-2">
            <div className="h-6 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          </td>

          {/* FEATURED */}
          <td className="hidden px-2 md:table-cell">
            <div className="h-6 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
