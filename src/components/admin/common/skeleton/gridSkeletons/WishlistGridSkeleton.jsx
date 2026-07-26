'use client';

export default function WishlistGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <div
          key={index}

          className="animate-pulse rounded-xl border bg-white p-5 dark:bg-zinc-900"
        >
          <div className="h-40 rounded-lg bg-gray-200 dark:bg-zinc-800" />

          <div className="mt-4 h-5 w-3/4 rounded bg-gray-200 dark:bg-zinc-800" />

          <div className="mt-3 h-4 w-1/2 rounded bg-gray-200 dark:bg-zinc-800" />

          <div className="mt-5 h-9 rounded-lg bg-gray-200 dark:bg-zinc-800" />
        </div>
      ))}
    </div>
  );
}
