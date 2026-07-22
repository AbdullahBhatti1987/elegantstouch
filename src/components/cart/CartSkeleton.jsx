'use client';

export default function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      {/* Heading */}
      <div className="mb-8 h-8 w-40 animate-pulse rounded-lg bg-gray-200 sm:h-10 sm:w-56 dark:bg-zinc-800" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex gap-3 rounded-2xl border bg-white p-3 shadow-sm sm:gap-5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Image */}
              <div className="h-20 w-20 shrink-0 animate-pulse rounded-xl bg-gray-200 sm:h-28 sm:w-28 dark:bg-zinc-800" />

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div>
                  {/* Product Name */}
                  <div className="h-4 w-full max-w-[180px] animate-pulse rounded bg-gray-200 sm:h-5 sm:max-w-[220px] dark:bg-zinc-800" />

                  {/* Description */}
                  <div className="mt-3 h-3 w-24 animate-pulse rounded bg-gray-200 sm:h-4 sm:w-36 dark:bg-zinc-800" />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  {/* Price */}
                  <div className="h-5 w-16 animate-pulse rounded bg-gray-200 sm:h-6 sm:w-24 dark:bg-zinc-800" />

                  {/* Quantity */}
                  <div className="h-9 w-20 animate-pulse rounded-xl bg-gray-200 sm:h-10 sm:w-28 dark:bg-zinc-800" />
                </div>
              </div>

              {/* Remove */}
              <div className="h-7 w-7 shrink-0 animate-pulse rounded-full bg-gray-200 sm:h-8 sm:w-8 dark:bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border bg-white p-4 shadow-sm sm:p-6 dark:border-zinc-800 dark:bg-zinc-900">
          {/* Title */}
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 sm:h-7 sm:w-44 dark:bg-zinc-800" />

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 sm:w-24 dark:bg-zinc-800" />

                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 sm:w-20 dark:bg-zinc-800" />
              </div>
            ))}

            <div className="my-5 border-t dark:border-zinc-700" />

            {/* Total */}
            <div className="flex justify-between">
              <div className="h-5 w-16 animate-pulse rounded bg-gray-200 sm:h-6 sm:w-20 dark:bg-zinc-800" />

              <div className="h-5 w-20 animate-pulse rounded bg-gray-200 sm:h-6 sm:w-28 dark:bg-zinc-800" />
            </div>

            {/* Coupon */}
            <div className="mt-6 h-11 animate-pulse rounded-xl bg-gray-200 sm:h-12 dark:bg-zinc-800" />

            {/* Button */}
            <div className="mt-4 h-11 animate-pulse rounded-xl bg-gray-200 sm:h-12 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
