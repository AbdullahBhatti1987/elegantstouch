'use client';

export default function CouponTableSkeleton({ rows = 8 }) {
  return (
    <div className="w-full space-y-3 px-3 py-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="flex h-14 w-full items-center gap-3 rounded-lg border-b dark:border-gray-800"
        >
          {/* INDEX */}
          <div className="flex w-[6%] justify-center">
            <div className="h-4 w-5 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* COUPON */}
          <div className="flex w-[24%] items-center gap-2">
            <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

              <div className="h-3 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

          {/* DISCOUNT */}
          <div className="hidden w-[15%] items-center gap-2 md:flex">
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* APPLY TYPE */}
          <div className="w-[15%]">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* MIN ORDER */}
          <div className="hidden w-[12%] sm:block">
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* EXPIRY */}
          <div className="hidden w-[16%] items-center gap-2 md:flex">
            <div className="h-3 w-3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* STATUS */}
          <div className="w-[12%]">
            <div className="h-6 w-14 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  );
}