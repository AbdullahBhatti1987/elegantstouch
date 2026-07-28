export default function FlashSaleSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
        >
          {/* Products Image Skeleton */}

          <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-2 dark:bg-neutral-800">
            {Array.from({
              length: 3,
            }).map((_, i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700"
              />
            ))}
          </div>
          {/* Content Skeleton */}

          <div className="space-y-4 p-4">
            {/* Title + Status */}

            <div className="flex items-center justify-between">
              <div className="h-5 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

              <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700" />
            </div>

            {/* Description */}

            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

              <div className="h-3 w-3/4 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>

            {/* Info */}

            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />

              <div className="h-4 w-36 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>

            {/* Button */}

            <div className="h-9 w-full animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>
      ))}
    </div>
  );
}
