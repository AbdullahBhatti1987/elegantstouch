'use client';

export default function CouponDetailSkeleton() {
  return (
    <div className="mt-4 animate-pulse">
      {/* Header Skeleton */}

      <div className="mb-6">
        <div className="h-8 w-64 rounded bg-gray-200 dark:bg-zinc-800" />

        <div className="mt-2 h-4 w-40 rounded bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* Main Grid */}

      <div className="grid gap-6 md:grid-cols-3">
        {/* Coupon Preview */}

        <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800">
            <div className="h-10 w-40 rounded bg-gray-300 dark:bg-zinc-700" />
          </div>

          <div className="mt-6 h-5 w-24 rounded bg-gray-200 dark:bg-zinc-800" />
        </div>

        {/* Details Skeleton */}

        <div className="space-y-5 rounded-xl border bg-white p-6 md:col-span-2 dark:bg-zinc-900">
          {/* Action Buttons */}

          <div className="flex justify-end gap-3">
            <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-zinc-800" />

            <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-zinc-800" />
          </div>

          {/* Info Rows */}

          {Array.from({
            length: 6,
          }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-28 rounded bg-gray-200 dark:bg-zinc-800" />

              <div className="h-6 w-full rounded bg-gray-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>

      {/* Additional Information Skeleton */}

      <div className="mt-6 space-y-5 rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <div className="h-7 w-56 rounded bg-gray-200 dark:bg-zinc-800" />

        {Array.from({
          length: 4,
        }).map((_, index) => (
          <div key={index} className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-zinc-800" />

            <div className="h-6 w-full rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
