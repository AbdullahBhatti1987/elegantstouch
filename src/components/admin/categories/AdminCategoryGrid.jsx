'use client';

import Loader from '@/components/common/Loader';
import AdminCategoryCard from './AdminCategoryCard';

export default function CategoryGrid({ categories = [], loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader count={8} />
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <AdminCategoryCard key={category._id} category={category} />
        ))
      ) : (
        <div className="col-span-full flex min-h-60 items-center justify-center rounded-xl border bg-white dark:border-gray-800 dark:bg-gray-900">
          <p className="text-gray-500 dark:text-gray-400">
            No Categories Available
          </p>
        </div>
      )}
    </div>
  );
}

// 'use client';

// import Loader from '@/components/common/Loader';
// import AdminCategoryCard from './AdminCategoryCard';

// export default function CategoryGrid({ categories = [], loading }) {
//   return (
//     <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//       {loading ? (
//         <Loader count={8} />
//       ) : categories.length > 0 ? (
//         categories.map((category) => (
//           <AdminCategoryCard key={category._id} category={category} />
//         ))
//       ) : (
//         <div className="col-span-full flex min-h-60 items-center justify-center rounded-xl border bg-white dark:border-gray-800 dark:bg-gray-900">
//           <p className="text-gray-500 dark:text-gray-400">
//             No Categories Available
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }
