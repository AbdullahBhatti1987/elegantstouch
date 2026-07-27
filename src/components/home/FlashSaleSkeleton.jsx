export default function FlashSaleSkeleton() {
  return (
    <section className="bg-neutral-100 px-6 py-8 md:px-12 md:py-16 dark:bg-neutral-800">
      <div className="mx-auto animate-pulse">
        {/* Header Skeleton */}

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row">
          <div>
            {/* Badge */}
            <div className="h-6 w-32 rounded-full bg-neutral-300 dark:bg-neutral-700" />

            {/* Title */}
            <div className="mt-4 h-10 w-56 rounded-lg bg-neutral-300 dark:bg-neutral-700" />

            {/* Description */}
            <div className="mt-3 h-4 w-72 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>

          {/* Countdown Skeleton */}

          <div className="flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white shadow dark:bg-neutral-900"
              >
                <div className="h-6 w-8 rounded bg-neutral-300 dark:bg-neutral-700" />

                <div className="mt-2 h-3 w-8 rounded bg-neutral-300 dark:bg-neutral-700" />
              </div>
            ))}
          </div>
        </div>

        {/* Products Skeleton */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
            >
              {/* Image */}

              <div className="relative aspect-square bg-neutral-300 dark:bg-neutral-700">
                {/* Sale badge */}

                <div className="absolute top-2 left-2 h-5 w-12 rounded-lg bg-neutral-400 dark:bg-neutral-600" />

                {/* Discount badge */}

                <div className="absolute top-2 right-2 h-5 w-16 rounded-lg bg-neutral-400 dark:bg-neutral-600" />
              </div>

              {/* Content */}

              <div className="p-3">
                {/* Product name */}

                <div className="h-4 w-3/4 rounded bg-neutral-300 dark:bg-neutral-700" />

                {/* Price */}

                <div className="mt-3 flex gap-2">
                  <div className="h-4 w-16 rounded bg-neutral-300 dark:bg-neutral-700" />

                  <div className="h-4 w-14 rounded bg-neutral-300 dark:bg-neutral-700" />
                </div>

                {/* Button */}

                <div className="mt-3 h-8 w-full rounded-lg bg-neutral-300 dark:bg-neutral-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
