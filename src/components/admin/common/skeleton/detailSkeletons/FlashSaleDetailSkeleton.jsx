'use client';

export default function FlashSaleDetailSkeleton() {
  return (
    <div className="mx-auto animate-pulse space-y-6 rounded-2xl bg-white p-6 shadow dark:bg-neutral-900">
      {/* Header Skeleton */}
      <div className="space-y-3">
        <div className="h-8 w-64 rounded-lg bg-gray-200 dark:bg-gray-700" />

        <div className="h-4 w-96 rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="space-y-8 rounded-2xl border bg-white p-8 dark:bg-gray-900">
        {/* Basic Information */}
        <section>
          <div className="mb-5 h-6 w-48 rounded bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-5">
            <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />

            <div className="h-32 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </section>

        {/* Schedule */}
        <section>
          <div className="mb-5 h-6 w-40 rounded bg-gray-200 dark:bg-gray-700" />

          <div className="grid gap-5 md:grid-cols-2">
            <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />

            <div className="h-12 rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </section>

        {/* Product Selection */}
        <section>
          <div className="mb-5 h-6 w-52 rounded bg-gray-200 dark:bg-gray-700" />

          <div className="space-y-8">
            {/* Category Selector */}
            <div>
              <div className="mb-3 h-5 w-64 rounded bg-gray-200 dark:bg-gray-700" />

              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 rounded-xl bg-gray-200 dark:bg-gray-700"
                  />
                ))}
              </div>
            </div>

            {/* Product Selector */}
            <div>
              <div className="mb-3 h-5 w-40 rounded bg-gray-200 dark:bg-gray-700" />

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-xl border p-3 dark:border-gray-700"
                  >
                    <div className="h-28 rounded-lg bg-gray-200 dark:bg-gray-700" />

                    <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />

                    <div className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Status */}
        <section>
          <div className="rounded-xl border p-5 dark:border-gray-700">
            <div className="mb-3 h-5 w-20 rounded bg-gray-200 dark:bg-gray-700" />

            <div className="h-12 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
          </div>
        </section>

        {/* Button */}
        <div className="flex justify-end">
          <div className="h-12 w-44 rounded-lg bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
