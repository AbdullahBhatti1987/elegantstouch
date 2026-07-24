// 'use client';

// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';

// import CategoryCard from '@/components/category/CategoryCard';
// import CategoryCardSkeleton from '@/components/category/CategoryCardSkeleton';
// import { useLoading } from '@/context/LoadingContext';
// import Pagination from '@/components/admin/common/Pagination';

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const { loading, startLoading, stopLoading } = useLoading();

//   const fetchCategories = useCallback(async () => {
//     try {
//       startLoading();

//       const { data } = await axios.get('/api/categories');

//       if (data.success) {
//         setCategories(data.data);
//       }
//     } catch (error) {
//       console.error('Categories Fetch Error:', error);
//     } finally {
//       stopLoading();
//     }
//   }, [startLoading, stopLoading]);

//   useEffect(() => {
//     fetchCategories();
//   }, [fetchCategories]);

//   return (
//     <section className="m-auto w-full max-w-7xl bg-white px-6 py-4 md:px-12 dark:bg-black">
//       {/* Header */}

//       <div className="mb-4">
//         <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
//           Categories
//         </h2>

//         <p className="mt-2 text-gray-500">
//           Best collections curated just for you
//         </p>
//       </div>

//       {/* Grid */}

//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
//         {loading ? (
//           <>
//             {/* Below lg */}
//             {Array.from({ length: 8 }).map((_, index) => (
//               <div key={index} className="lg:hidden">
//                 <CategoryCardSkeleton />
//               </div>
//             ))}

//             {/* lg and above */}
//             {Array.from({ length: 12 }).map((_, index) => (
//               <div
//                 key={`desktop-${index}`}
//                 className="hidden lg:block"
//               >
//                 <CategoryCardSkeleton />
//               </div>
//             ))}
//           </>
//         ) : (
//           categories.length > 0 &&
//           categories.map((category) => (
//             <CategoryCard key={category._id} category={category} />
//           ))
//         )}
//       </div>

//       {/* Pagination */}

//       <div className="mt-10 flex justify-center">
//         <Pagination
//           pagination={pagination}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </section>
//   );
// }

'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import CategoryCard from '@/components/category/CategoryCard';
import CategoryCardSkeleton from '@/components/category/CategoryCardSkeleton';
import { useLoading } from '@/context/LoadingContext';
import Pagination from '@/components/admin/common/Pagination';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 8,
  });

  const { loading, startLoading, stopLoading } = useLoading();

  const fetchCategories = useCallback(
    async (page = 1) => {
      try {
        startLoading();

        const { data } = await axios.get(
          `/api/categories?page=${page}&limit=${pagination.limit}`,
        );

        if (data.success) {
          setCategories(data.data);

          setPagination(data.pagination);
        }
      } catch (error) {
        console.error('Categories Fetch Error:', error);
      } finally {
        stopLoading();
      }
    },
    [pagination.limit, startLoading, stopLoading],
  );

  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  const handlePageChange = (page) => {
    fetchCategories(page);
  };

  return (
    <section className="m-auto w-full max-w-7xl bg-white px-6 py-4 md:px-12 dark:bg-black">
      {/* Header */}

      <div className="mb-4">
        <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
          Categories
        </h2>

        <p className="mt-2 text-gray-500">
          Best collections curated just for you
        </p>
      </div>

      {/* Grid */}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
        {loading ? (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="lg:hidden">
                <CategoryCardSkeleton />
              </div>
            ))}

            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={`desktop-${index}`}
                className="hidden lg:block"
              >
                <CategoryCardSkeleton />
              </div>
            ))}
          </>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No categories found
          </p>
        )}
      </div>

      {/* Pagination */}

      {pagination.totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </section>
  );
}
