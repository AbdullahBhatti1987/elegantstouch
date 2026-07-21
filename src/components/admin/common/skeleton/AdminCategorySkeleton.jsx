export default function AdminCategorySkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Top Section */}
      <div className="flex gap-3">
        {/* Image */}
        <div className="skeleton h-24 w-24 shrink-0 rounded-xl" />

        {/* Info */}
        <div className="flex-1 space-y-2">
          {/* Name */}
          <div className="skeleton h-4 w-3/4 rounded" />

          {/* Slug */}
          <div className="skeleton h-3 w-1/2 rounded" />

          {/* Status */}
          <div className="skeleton h-5 w-10 md:16 rounded-full" />
        </div>
      </div>

      {/* Description */}

      <div className="mt-3 space-y-2">
        <div className="skeleton h-3 w-full rounded" />

        <div className="skeleton h-3 w-2/3 rounded" />
      </div>

      {/* Stats */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="skeleton h-14 rounded-lg" />

        <div className="skeleton h-14 rounded-lg" />

        <div className="skeleton h-14 rounded-lg" />
      </div>

      {/* Keywords */}

      <div className="mt-3 flex gap-2">
        <div className="skeleton h-5 w-14 rounded-full" />

        <div className="skeleton h-5 w-20 rounded-full" />

        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}
