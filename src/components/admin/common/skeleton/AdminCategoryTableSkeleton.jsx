'use client';

export default function AdminCategoryTableSkeleton({ rows = 8 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="h-14 border-b">
          {/* Image */}
          <td className="w-[70px] px-2 py-2 md:px-4">
            <div className="skeleton h-10 w-10 rounded-lg" />
          </td>

          {/* Category */}
          <td className="px-2 py-2 md:px-4">
            <div className="w-[120px]">
              <div className="skeleton h-4 w-24 rounded" />
            </div>
          </td>

          {/* Description */}
          <td className="hidden px-2 py-2 md:table-cell">
            <div className="w-[300px] space-y-2">
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-4/5 rounded" />
            </div>
          </td>

          {/* Slug */}
          <td className="px-2 py-2 md:px-4">
            <div className="skeleton h-4 w-28 rounded" />
          </td>

          {/* Status */}
          <td className="px-2 py-2 md:px-4">
            <div className="skeleton h-6 w-16 rounded-full" />
          </td>

          {/* Featured */}
          <td className="px-4 text-center">
            <div className="skeleton mx-auto h-5 w-12 rounded-full" />
          </td>

          {/* Created */}
          <td className="px-2 py-2 md:px-4">
            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-4 rounded" />
              <div className="skeleton h-4 w-20 rounded" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
