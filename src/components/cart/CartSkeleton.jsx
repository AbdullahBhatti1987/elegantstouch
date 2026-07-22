'use client';

export default function CartSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Heading */}
      <div className="mb-8 h-10 w-56 animate-pulse rounded-lg bg-gray-200 dark:bg-zinc-800" />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="space-y-5 lg:col-span-2">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex gap-5 rounded-2xl border bg-white p-2 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Image */}
              <div className="h-28 w-28 shrink-0 animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800" />

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  {/* Product Name */}
                  <div className="h-5 w-52 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

                  {/* Description */}
                  <div className="mt-3 h-4 w-36 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
                </div>

                <div className="flex items-center justify-between">
                  {/* Price */}
                  <div className="h-6 w-24 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

                  {/* Quantity */}
                  <div className="h-10 w-28 animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800" />
                </div>
              </div>

              {/* Remove */}
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200 dark:bg-zinc-800" />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          {/* Title */}
          <div className="h-7 w-44 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

          <div className="mt-8 space-y-5">
            {/* subtotal */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex justify-between">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
              </div>
            ))}

            <div className="my-5 border-t dark:border-zinc-700" />

            {/* Total */}
            <div className="flex justify-between">
              <div className="h-6 w-20 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />

              <div className="h-6 w-28 animate-pulse rounded bg-gray-200 dark:bg-zinc-800" />
            </div>

            {/* Coupon */}
            <div className="mt-6 h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800" />

            {/* Button */}
            <div className="mt-4 h-12 animate-pulse rounded-xl bg-gray-200 dark:bg-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
