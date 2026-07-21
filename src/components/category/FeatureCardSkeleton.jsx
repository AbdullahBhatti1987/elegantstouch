'use client';

export default function FeatureCardSkeleton() {
  return (
    <div className="relative block overflow-hidden rounded-2xl bg-white shadow-sm dark:bg-zinc-900">
      {/* Image Skeleton */}

      <div className="relative aspect-[4/5] overflow-hidden">
        <div className="h-full w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

        {/* Content Skeleton */}

        <div className="absolute bottom-0 left-0 w-full p-5">
          {/* Title */}

          <div className="h-6 w-2/3 animate-pulse rounded bg-white/30" />

          {/* Description */}

          <div className="mt-2 h-4 w-full animate-pulse rounded bg-white/20" />
          <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-white/20" />

          {/* Footer */}

          <div className="mt-4 flex items-center justify-between">
            <div className="h-7 w-24 animate-pulse rounded-full bg-white/20" />

            <div className="bg-opacity-50 h-9 w-9 animate-pulse rounded-full bg-white" />
          </div>
        </div>

        {/* Border */}

        <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      </div>
    </div>
  );
}
