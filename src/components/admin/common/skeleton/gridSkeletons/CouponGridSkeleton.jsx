'use client';

export default function CouponGridSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="animate-pulse">
        {/* HEADER */}

        <div className="flex gap-3">
          {/* Icon */}

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800" />

          {/* Code + Status */}

          <div className="min-w-0 flex-1">
            <div className="h-6 w-28 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mt-3 h-6 w-16 rounded-full bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        {/* DISCOUNT */}

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <div className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-5 w-20 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-3 w-16 rounded bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
            <div className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-5 w-24 rounded bg-gray-300 dark:bg-gray-700" />

            <div className="mt-2 h-3 w-16 rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* DETAILS */}

        <div className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="flex items-center justify-between">
            <div className="h-4 w-12 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          <div className="flex items-center justify-between">
            <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>

        {/* APPLY TYPE */}

        <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800">
          <div className="h-4 w-4 rounded bg-gray-300 dark:bg-gray-700" />

          <div className="h-4 w-28 rounded bg-gray-300 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
