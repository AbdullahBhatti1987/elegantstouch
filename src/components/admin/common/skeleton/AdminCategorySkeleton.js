export default function AdminCategorySkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-400 shadow-md bg-white dark:bg-gray-900">

      {/* Image */}
      <div className="skeleton h-48 sm:h-52 md:h-56 lg:h-64" />


      {/* Content */}
      <div className="space-y-3 p-4">

        {/* Name */}
        <div className="skeleton h-6 w-3/4 rounded" />


        {/* Description */}
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-2/3 rounded" />


        {/* Product Count */}
        {/* <div className="skeleton h-5 w-1/3 rounded" /> */}


        {/* Buttons */}
        {/* <div className="flex gap-3 pt-3">
          <div className="skeleton h-9 w-20 rounded-lg" />
          <div className="skeleton h-9 w-20 rounded-lg" />
        </div> */}

      </div>

    </div>
  );
}