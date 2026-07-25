export default function BannerGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border bg-white"
        >
          {/* Image Skeleton */}
          <div className="h-48 w-full bg-gray-200" />

          {/* Content Skeleton */}
          <div className="space-y-3 p-4">
            <div className="h-5 w-3/4 rounded bg-gray-200" />

            <div className="h-4 w-full rounded bg-gray-200" />

            <div className="h-4 w-1/2 rounded bg-gray-200" />

            <div className="mt-4 h-9 w-20 rounded-lg bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
