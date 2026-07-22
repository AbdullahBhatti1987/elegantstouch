'use client';

export default function ProductCardSkeleton({
  showCartButton = true,
}) {
  return (
    <article className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* IMAGE SKELETON */}
      <div className="relative h-36 rounded-t-2xl bg-gray-200 sm:h-52">
        {/* BADGE */}
        <div className="absolute top-3 left-3 h-5 w-16 rounded-full bg-gray-300" />

        {/* HEART */}
        <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-300" />
      </div>

      {/* CONTENT */}
      <div className="space-y-3 p-3">
        {/* BRAND */}
        <div className="h-3 w-20 rounded bg-gray-200" />

        {/* TITLE */}
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        {/* DESCRIPTION */}
        <div className="h-3 w-full rounded bg-gray-200" />

        {/* RATING */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-gray-200" />

          <div className="h-3 w-8 rounded bg-gray-200" />

          <div className="h-3 w-10 rounded bg-gray-200" />
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 rounded bg-gray-200" />

          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>

        {/* CART BUTTON */}

        {showCartButton && (
          <div className="mt-3 h-12 w-full rounded-xl bg-gray-200" />
        )}
      </div>
    </article>
  );
}
