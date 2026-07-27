// components/admin/banner/BannerDetailSkeleton.jsx

export default function BannerDetailSkeleton() {
  return (
    <div className="mt-4 animate-pulse">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <div className="h-9 w-64 rounded bg-gray-200" />

          <div className="mt-3 h-4 w-80 rounded bg-gray-200" />
        </div>

        <div className="h-10 w-28 rounded-lg bg-gray-200" />
      </div>

      {/* MAIN CARD */}

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* IMAGE */}

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="mb-4 h-6 w-40 rounded bg-gray-200" />

          <div className="aspect-square w-full rounded-xl bg-gray-200" />

          <div className="mt-3 h-4 w-48 rounded bg-gray-200" />
        </div>

        {/* DETAILS */}

        <div className="space-y-6 lg:col-span-2">
          {/* BASIC INFORMATION */}

          <div className="relative rounded-2xl border bg-white p-6 shadow-sm">
            {/* ACTION BUTTONS */}

            <div className="absolute top-4 right-4 flex gap-2">
              <div className="h-9 w-9 rounded-lg bg-gray-200" />

              <div className="h-9 w-9 rounded-lg bg-gray-200" />
            </div>

            <div className="mb-5 h-7 w-56 rounded bg-gray-200" />

            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-2 h-4 w-28 rounded bg-gray-200" />

                  <div className="h-6 w-full rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-3 h-7 w-44 rounded bg-gray-200" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />

              <div className="h-4 w-11/12 rounded bg-gray-200" />

              <div className="h-4 w-8/12 rounded bg-gray-200" />
            </div>
          </div>

          {/* BUTTON DETAILS */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-5 h-7 w-40 rounded bg-gray-200" />

            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index}>
                  <div className="mb-2 h-4 w-32 rounded bg-gray-200" />

                  <div className="h-6 w-full rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE */}

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-4 h-7 w-40 rounded bg-gray-200" />

            <div>
              <div className="mb-2 h-4 w-28 rounded bg-gray-200" />

              <div className="h-6 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
