'use client';

export default function AdminCartTableSkeleton({ rows = 8 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr
          key={index}
          className="h-14 border-b dark:border-gray-800"
        >
          {/* INDEX */}
          <td className="px-2 text-center">
            <div className="skeleton mx-auto h-4 w-6 rounded" />
          </td>

          {/* CUSTOMER */}
          <td className="px-2 py-2 md:px-4">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="skeleton h-8 w-8 rounded-lg" />

              <div className="space-y-2">
                {/* Name */}
                <div className="skeleton h-4 w-24 rounded" />

                {/* Email */}
                <div className="skeleton h-3 w-32 rounded" />
              </div>
            </div>
          </td>

          {/* PRODUCTS */}
          <td className="hidden px-2 md:table-cell md:px-4">
            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-4 rounded" />

              <div className="skeleton h-4 w-20 rounded" />
            </div>
          </td>

          {/* ITEMS */}
          <td className="px-2 md:px-4">
            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-4 rounded" />

              <div className="skeleton h-4 w-8 rounded" />
            </div>
          </td>

          {/* AMOUNT */}
          <td className="px-2 md:px-4">
            <div className="skeleton h-4 w-20 rounded" />
          </td>

          {/* CART AGE */}
          <td className="hidden px-2 sm:table-cell md:px-4">
            <div className="flex items-center gap-2">
              <div className="skeleton h-4 w-4 rounded" />

              <div className="skeleton h-4 w-14 rounded" />
            </div>
          </td>

          {/* STATUS */}
          <td className="px-2 md:px-4">
            <div className="skeleton h-6 w-16 rounded-full" />
          </td>
        </tr>
      ))}
    </>
  );
}
