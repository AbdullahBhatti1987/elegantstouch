'use client';

export default function OrderGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <OrderCardSkeleton key={index} />
      ))}
    </div>
  );
}

function OrderCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-4 dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Details */}
      <div className="mt-4 space-y-3">
        <div className="h-4 w-40 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

        <div className="h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Buttons */}
      <div className="mt-5 flex gap-2">
        <div className="h-10 flex-1 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />

        <div className="h-10 w-10 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
