'use client';

export default function OrderEditSkeleton() {
  return (
    <div className="mx-auto animate-pulse">
      {/* HEADER */}
      <div className="mb-6">
        <div className="h-8 w-56 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="mt-3 h-4 w-80 rounded bg-gray-200 dark:bg-gray-800" />

        <div className="mt-4 h-9 w-28 rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* ORDER INFORMATION */}
          <div className="rounded-xl border bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 h-5 w-44 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="grid gap-4 md:grid-cols-2">
              {[1, 2].map((item) => (
                <div key={item}>
                  <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="mt-2 h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          </div>

          {/* CUSTOMER DETAILS */}
          <div className="rounded-xl border bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 h-5 w-44 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index}>
                  <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="mt-2 h-5 w-full rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="rounded-xl border bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 h-5 w-32 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border p-4 dark:border-gray-800"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index}>
                        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-800" />

                        <div className="mt-2 h-5 w-36 rounded bg-gray-200 dark:bg-gray-800" />
                      </div>
                    ))}
                  </div>

                  {/* SELECT */}
                  <div className="mt-5">
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

                    <div className="mt-2 h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* SUMMARY */}
          <div className="rounded-xl border bg-white p-5 dark:bg-gray-900">
            <div className="mb-5 h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="space-y-4">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex justify-between">
                  <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />

                  <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-800" />
                </div>
              ))}
            </div>
          </div>

          {/* STATUS */}
          <div className="rounded-xl border bg-white p-5 lg:sticky lg:top-20 dark:bg-gray-900">
            <div className="mb-5 h-5 w-36 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mb-4 h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mb-5 h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />

            <div className="mb-4 h-4 w-32 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="mb-5 h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />

            <div className="h-10 w-full rounded-lg bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
