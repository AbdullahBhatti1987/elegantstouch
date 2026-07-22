'use client';

export default function CategoryCardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md dark:bg-zinc-900">
      {/* Image Skeleton */}

      <div className="relative aspect-square overflow-hidden rounded-xl">
        <div className="h-full w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />
      </div>

      {/* Name Skeleton */}

      <div className="border-t border-gray-100 p-3 text-center rounded dark:border-zinc-800">
        <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
