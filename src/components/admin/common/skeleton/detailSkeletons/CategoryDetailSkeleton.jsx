'use client';

export default function CategoryDetailSkeleton() {
  return (
    <div className="mt-4 animate-pulse">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-9 w-64 rounded bg-gray-200 dark:bg-zinc-800" />
          <div className="mt-3 h-4 w-40 rounded bg-gray-200 dark:bg-zinc-800" />
        </div>

        <div className="h-10 w-24 rounded-lg bg-gray-200 dark:bg-zinc-800" />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Image Skeleton */}
        <div className="h-84 rounded-xl border bg-gray-200 dark:bg-zinc-800" />

        {/* Information Skeleton */}
        <div className="space-y-5 rounded-xl border bg-white p-6 md:col-span-2 dark:bg-zinc-900">
          {/* Actions */}
          <div className="flex justify-end gap-2">
            <div className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-zinc-800" />
            <div className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-zinc-800" />
          </div>

          {/* Info Fields */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <div className="mb-2 h-3 w-20 rounded bg-gray-200 dark:bg-zinc-800" />

              <div className="h-5 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>
      </div>

      {/* SEO Section */}
      <div className="mt-6 rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <div className="mb-5 h-7 w-44 rounded bg-gray-200 dark:bg-zinc-800" />

        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="mb-5">
            <div className="mb-2 h-3 w-24 rounded bg-gray-200 dark:bg-zinc-800" />

            <div className="h-5 w-4/5 rounded bg-gray-200 dark:bg-zinc-800" />
          </div>
        ))}
      </div>
    </div>
  );
}
