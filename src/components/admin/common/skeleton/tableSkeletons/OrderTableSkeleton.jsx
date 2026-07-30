'use client';

export default function OrderTableSkeleton({ rows = 8 }) {
  return (
    <div className="w-full space-y-3 px-3 py-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex h-14 w-full items-center gap-3 rounded-lg border-b dark:border-gray-800"
        >
          {/* ORDER ID */}
          <div className="w-[16%]">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* CUSTOMER */}
          <div className="w-[16%]">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* ITEMS */}
          <div className="flex w-[10%] justify-center">
            <div className="h-6 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* TOTAL */}
          <div className="w-[14%]">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* PAYMENT */}
          <div className="w-[14%]">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* STATUS */}
          <div className="w-[12%]">
            <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* ACTIONS */}
          <div className="flex w-[18%] justify-center gap-2">
            <div className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
