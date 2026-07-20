'use client';

export default function CategoryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-gray-800 dark:bg-zinc-900">
      {/* Image Skeleton */}

      <div className="relative h-48 animate-pulse overflow-hidden bg-gray-200 dark:bg-gray-800">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>

      {/* Content Skeleton */}

      <div className="space-y-3 p-5">
        <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

        <div className="mx-auto h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
