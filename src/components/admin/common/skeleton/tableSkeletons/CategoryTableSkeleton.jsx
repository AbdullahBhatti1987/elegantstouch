'use client';

export default function CategoryTableSkeleton({ count = 8 }) {
  return (
    <div className="w-full space-y-3 px-3 py-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex h-14 w-full items-center gap-3 rounded-lg border-b dark:border-gray-800"
        >
          {/* IMAGE */}
          <div className="flex w-[8%] justify-center">
            <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* CATEGORY */}
          <div className="w-[20%]">
            <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* DESCRIPTION */}
          <div className="hidden w-[18%] space-y-2 md:block">
            <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* SLUG */}
          <div className="hidden w-[12%] md:block">
            <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* KEYWORDS */}
          <div className="hidden w-[10%] md:block">
            <div className="h-3 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* PRODUCTS */}
          <div className="flex w-[7%] justify-center">
            <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* ORDERS */}
          <div className="hidden w-[7%] justify-center md:flex">
            <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* STATUS */}
          <div className="w-[7%]">
            <div className="h-5 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* FEATURED */}
          <div className="hidden w-[6%] justify-center md:flex">
            <div className="h-6 w-12 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* CREATED */}
          <div className="flex w-[8%] items-center gap-2">
            <div className="h-3 w-3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
