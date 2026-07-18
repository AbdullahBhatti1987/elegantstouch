// export default function ProductDetailSkeleton() {
//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//         <div className="skeleton h-7 w-48 rounded" />

//         <div className="skeleton mt-2 h-4 w-72 rounded" />
//       </div>

//       {/* Main Form */}

//       <div className="rounded-2xl border bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
//         {/* Image Section */}

//         <div className="mb-6">
//           <div className="skeleton mb-3 h-5 w-32 rounded" />

//           <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
//             <div className="skeleton h-32 rounded-xl" />

//             <div className="skeleton h-32 rounded-xl" />

//             <div className="skeleton h-32 rounded-xl" />
//           </div>
//         </div>

//         {/* Two Column Fields */}

//         <div className="grid gap-5 md:grid-cols-2">
//           {/* Inputs */}

//           {[1, 2, 3, 4, 5, 6].map((item) => (
//             <div key={item}>
//               <div className="skeleton mb-2 h-4 w-24 rounded" />

//               <div className="skeleton h-11 w-full rounded-xl" />
//             </div>
//           ))}
//         </div>

//         {/* Description */}

//         <div className="mt-6">
//           <div className="skeleton mb-2 h-4 w-32 rounded" />

//           <div className="skeleton h-28 w-full rounded-xl" />
//         </div>

//         {/* SEO Section */}

//         <div className="mt-6">
//           <div className="skeleton mb-4 h-5 w-40 rounded" />

//           <div className="space-y-4">
//             <div className="skeleton h-11 w-full rounded-xl" />

//             <div className="skeleton h-24 w-full rounded-xl" />
//           </div>
//         </div>

//         {/* Buttons */}

//         <div className="mt-6 flex gap-3">
//           <div className="skeleton h-11 w-36 rounded-xl" />

//           <div className="skeleton h-11 w-28 rounded-xl" />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

export default function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="skeleton h-8 w-64 rounded-lg" />
          <div className="skeleton h-4 w-32 rounded" />
        </div>

        <div className="skeleton h-10 w-24 rounded-lg" />
      </div>

      {/* Main */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Gallery */}

        <div className="rounded-2xl border bg-white p-4 shadow-sm dark:bg-zinc-900">
          <div className="space-y-4">
            {/* Main Image */}

            <div className="skeleton aspect-square w-full rounded-2xl sm:aspect-[4/3] lg:aspect-[5/4]" />

            {/* Thumbnails */}

            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton aspect-square rounded-xl"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}

        <div className="space-y-5 xl:col-span-2">
          {/* Summary Card */}

          <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
            <div className="mb-6 flex justify-between">
              <div className="skeleton h-6 w-48 rounded" />

              <div className="flex gap-2">
                <div className="skeleton h-9 w-9 rounded-lg" />

                <div className="skeleton h-9 w-9 rounded-lg" />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <InfoSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Information Card */}

          <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
            <div className="skeleton mb-5 h-6 w-56 rounded" />

            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <InfoSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}

      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <div className="skeleton mb-5 h-6 w-40 rounded" />

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <InfoSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* SEO */}

      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <div className="skeleton mb-5 h-6 w-48 rounded" />

        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <InfoSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoSkeleton() {
  return (
    <div className="space-y-2">
      <div className="skeleton h-3 w-20 rounded" />

      <div className="skeleton h-5 w-full rounded" />
    </div>
  );
}
