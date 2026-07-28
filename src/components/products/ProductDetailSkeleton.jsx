'use client';

export default function ProductDetailSkeleton() {
  return (
    <section className="mx-auto max-w-6xl animate-pulse px-3 py-6 sm:px-5 lg:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        {/* IMAGE SECTION */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          {/* THUMBNAILS */}

          <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-16 w-16 shrink-0 rounded-lg bg-gray-200 sm:h-20 sm:w-20 dark:bg-gray-800"
              />
            ))}
          </div>

          {/* MAIN IMAGE */}

          <div className="aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 sm:max-w-md dark:bg-gray-800" />
        </div>

        {/* PRODUCT INFO */}

        <div className="space-y-5">
          {/* BRAND */}

          <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-800" />

          {/* TITLE */}

          <div className="space-y-2">
            <div className="h-7 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-7 w-1/2 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* RATING */}

          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-4 rounded bg-gray-200 dark:bg-gray-800"
                />
              ))}
            </div>

            <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* PRICE */}

          <div className="flex gap-3">
            <div className="h-8 w-28 rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* STOCK */}

          <div className="h-6 w-20 rounded-full bg-gray-200 dark:bg-gray-800" />

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />

            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* INFO GRID */}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-16 rounded-xl border bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="mb-2 h-3 w-20 rounded bg-gray-200 dark:bg-gray-800" />

                <div className="h-4 w-28 rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            ))}
          </div>

          {/* ACTIONS */}

          <div className="flex gap-3">
            {/* Quantity */}

            <div className="h-12 w-32 rounded-xl bg-gray-200 dark:bg-gray-800" />

            {/* Wishlist */}

            <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-gray-800" />
          </div>

          {/* CART BUTTON */}

          <div className="h-12 w-full rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </section>
  );
}
