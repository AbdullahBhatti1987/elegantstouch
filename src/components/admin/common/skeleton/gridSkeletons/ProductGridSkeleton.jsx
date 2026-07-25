'use client';

export default function ProductGridSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="animate-pulse">
        {/* Top Section */}

        <div className="flex gap-3">
          {/* Image */}

          <div className="relative h-24 w-24 shrink-0 rounded-xl bg-gray-200 dark:bg-gray-800" />

          {/* Product Info */}

          <div className="min-w-0 flex-1">
            {/* Title */}

            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

            {/* Category */}

            <div className="mt-2 h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />

            {/* Status */}

            <div className="mt-3 h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        {/* Details */}

        <div className="mt-3 grid grid-cols-3 gap-2">
          {/* Price */}

          <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <div className="h-3 w-10 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-4 w-16 rounded bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Stock */}

          <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <div className="h-3 w-12 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-4 w-10 rounded bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Badge */}

          <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-800">
            <div className="h-3 w-10 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-4 w-14 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* Description */}

        <div className="mt-3 space-y-2">
          <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-800" />

          <div className="h-3 w-4/5 rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        {/* Footer */}

        <div className="mt-3 flex items-center justify-between border-t pt-3">
          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />

          <div className="h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
