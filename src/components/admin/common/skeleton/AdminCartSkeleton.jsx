export default function AdminCartSkeleton() {
  return (
    <div className="rounded-2xl border bg-white p-3 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      {/* Top Section */}

      <div className="flex gap-3">
        {/* User Icon */}

        <div className="skeleton h-20 w-20 shrink-0 rounded-xl" />

        {/* Customer Info */}

        <div className="flex-1 space-y-2">
          {/* Name */}

          <div className="skeleton h-4 w-3/4 rounded" />

          {/* Email */}

          <div className="skeleton h-3 w-2/3 rounded" />

          {/* Status */}

          <div className="skeleton h-5 w-16 rounded-full" />
        </div>
      </div>

      {/* Stats */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* Products */}

        <div className="skeleton h-14 rounded-lg" />

        {/* Quantity */}

        <div className="skeleton h-14 rounded-lg" />

        {/* Amount */}

        <div className="skeleton h-14 rounded-lg" />
      </div>

      {/* Cart Items Preview */}

      <div className="mt-3 space-y-2">
        <div className="skeleton h-3 w-full rounded" />

        <div className="skeleton h-3 w-4/5 rounded" />
      </div>

      {/* Cart Age Tags */}

      <div className="mt-3 flex gap-2">
        <div className="skeleton h-5 w-20 rounded-full" />

        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}
