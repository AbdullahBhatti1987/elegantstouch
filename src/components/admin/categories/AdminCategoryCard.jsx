// // 'use client';

// // import Image from 'next/image';
// // import { useRouter } from 'next/navigation';
// // import { Star, CalendarDays, Tag } from 'lucide-react';

// // export default function AdminCategoryCard({ category }) {
// //   const router = useRouter();

// //   return (
// //     <div className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
// //       <div
// //         onClick={() =>
// //           router.push(`/dashboard/categories/${category._id}`)
// //         }
// //         className="relative h-52 w-full cursor-pointer overflow-hidden"
// //       >
// //         {category?.image ? (
// //           <Image
// //             src={category.image.thumbnail}
// //             alt={category.alt || category.name}
// //             fill
// //             sizes="(max-width:640px)100vw,50vw"
// //             priority
// //             className="object-cover transition duration-500 group-hover:scale-110"
// //           />
// //         ) : (
// //           <div className="flex h-full items-center justify-center bg-gray-100">
// //             No Image
// //           </div>
// //         )}

// //         {/* Status */}
// //         <div className="absolute top-3 left-3">
// //           <span
// //             className={`rounded-full px-3 py-1 text-xs font-semibold ${
// //               category.status === 'active'
// //                 ? 'bg-green-100 text-green-700'
// //                 : 'bg-red-100 text-red-700'
// //             } `}
// //           >
// //             {category.status}
// //           </span>
// //         </div>

// //         {/* Featured */}
// //         {category.featured && (
// //           <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
// //             <Star size={13} fill="currentColor" />
// //             Featured
// //           </div>
// //         )}
// //       </div>

// //       {/* Content */}
// //       <div className="p-5">
// //         <div className="mb-2 flex items-start justify-between gap-3">
// //           <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
// //             {category.name}
// //           </h3>

// //           {/* <button
// //             onClick={() =>
// //               router.push(
// //                 `/dashboard/categories/update/${category._id}`,
// //               )
// //             }
// //             className="rounded-lg border p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
// //           >
// //             <Edit size={16} />
// //           </button> */}
// //         </div>

// //         {/* Slug */}
// //         <div className="flex items-center gap-2 text-sm text-gray-500">
// //           <Tag size={15} />
// //           {category.slug}
// //         </div>

// //         {/* Description */}
// //         <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
// //           {category.description}
// //         </p>

// //         {/* Stats */}
// //         <div className="mt-5 grid grid-cols-2 gap-3">
// //           {/* <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
// //             <div className="flex items-center gap-2 text-sm text-gray-500">
// //               <Package size={15} />
// //               Products
// //             </div>

// //             <p className="mt-1 font-bold">
// //               {category.productCount || 0}
// //             </p>
// //           </div> */}

// //           <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
// //             <div className="flex items-center gap-2 text-sm text-gray-500">
// //               <Tag size={15} />
// //               Keywords
// //             </div>

// //             <p className="mt-1 font-bold">
// //               {category.keywords?.length || 0}
// //             </p>
// //           </div>
// //         </div>

// //         {/* Footer */}
// //         <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs text-gray-500">
// //           <div className="flex items-center gap-1">
// //             <CalendarDays size={14} />
// //             {new Date(category.createdAt).toLocaleDateString()}
// //           </div>

// //           <span>Order: {category.sortOrder}</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import {
//   Star,
//   CalendarDays,
//   Tag,
//   Package,
//   ArrowUpRight,
// } from 'lucide-react';

// export default function AdminCategoryCard({ category }) {
//   const router = useRouter();

//   return (
//     <div className="group overflow-hidden rounded-3xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-gray-900">
//       {/* Image */}
//       <div
//         onClick={() =>
//           router.push(`/dashboard/categories/${category._id}`)
//         }
//         className="relative aspect-square cursor-pointer overflow-hidden"
//       >
//         {category?.image ? (
//           <Image
//             src={category.image.thumbnail}
//             alt={category.alt || category.name}
//             fill
//             sizes="(max-width:640px)100vw,33vw"
//             className="object-cover transition duration-700 group-hover:scale-110"
//           />
//         ) : (
//           <div className="flex h-full items-center justify-center bg-gray-100">
//             No Image
//           </div>
//         )}

//         {/* Dark Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

//         {/* Top badges */}

//         <div className="absolute top-4 left-4">
//           <span
//             className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${
//               category.status === 'active'
//                 ? 'bg-green-500/90 text-white'
//                 : 'bg-red-500/90 text-white'
//             } `}
//           >
//             {category.status}
//           </span>
//         </div>

//         {category.featured && (
//           <div className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-bold text-black backdrop-blur-md">
//             <Star size={14} fill="black" />
//             Featured
//           </div>
//         )}

//         {/* Image Bottom Content */}

//         <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
//           <h3 className="text-xl font-bold drop-shadow-lg">
//             {category.name}
//           </h3>

//           <div className="mt-1 flex items-center gap-2 text-sm text-gray-200">
//             <Tag size={14} />
//             {category.slug}
//           </div>
//         </div>

//         {/* Open Icon */}

//         <div className="absolute right-4 bottom-5 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur-md transition group-hover:opacity-100">
//           <ArrowUpRight size={18} />
//         </div>
//       </div>

//       {/* Content */}

//       <div className="p-5">
//         {/* Description */}

//         <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
//           {category.description}
//         </p>

//         {/* Stats */}

//         <div className="mt-5 grid grid-cols-2 gap-3">
//           <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
//             <div className="flex items-center gap-2 text-xs text-gray-500">
//               <Package size={14} />
//               Products
//             </div>

//             <p className="mt-1 text-lg font-bold">
//               {category.productCount || 0}
//             </p>
//           </div>

//           <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
//             <div className="flex items-center gap-2 text-xs text-gray-500">
//               <Tag size={14} />
//               Keywords
//             </div>

//             <p className="mt-1 text-lg font-bold">
//               {category.keywords?.length || 0}
//             </p>
//           </div>
//         </div>

//         {/* Keywords */}

//         {category.keywords?.length > 0 && (
//           <div className="mt-4 flex flex-wrap gap-2">
//             {category.keywords.slice(0, 3).map((keyword, index) => (
//               <span
//                 key={index}
//                 className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-600 dark:bg-blue-900/30"
//               >
//                 {keyword}
//               </span>
//             ))}
//           </div>
//         )}

//         {/* Footer */}

//         <div className="mt-5 flex items-center justify-between border-t pt-4 text-xs text-gray-500">
//           <div className="flex items-center gap-1">
//             <CalendarDays size={14} />
//             {new Date(category.createdAt).toLocaleDateString()}
//           </div>

//           <span className="rounded-lg bg-gray-100 px-3 py-1 dark:bg-gray-800">
//             Order {category.sortOrder}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Star, CalendarDays, Tag, Package } from 'lucide-react';

export default function AdminCategoryCard({ category }) {
  const router = useRouter();

  return (
    <div
      className="group cursor-pointer rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-3 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"

      onClick={() =>
        router.push(`/dashboard/categories/${category._id}`)
      }
    >
      {/* Top Section */}

      <div className="flex gap-3">
        {/* Image Square */}

        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          {category?.image ? (
            <Image
              src={category.image.thumbnail}
              alt={category.alt || category.name}
              fill
              sizes="96px"
              className="object-cover transition group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-xs">
              No Image
            </div>
          )}

          {category.featured && (
            <div className="absolute top-1 left-1 rounded-full bg-yellow-400 p-1">
              <Star size={11} fill="black" />
            </div>
          )}
        </div>

        {/* Basic Info */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {category.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 truncate text-xs text-gray-500">
            <Tag size={12} />
            {category.slug}
          </div>

          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              category.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } `}
          >
            {category.status}
          </span>
        </div>
      </div>

      {/* Description */}

      <p className="mt-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
        {category.description}
      </p>

      {/* Details Grid */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Package size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {category.productCount || 0}
          </p>

          <span className="text-[10px] text-gray-500">Products</span>
        </div>

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <Tag size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {category.keywords?.length || 0}
          </p>

          <span className="text-[10px] text-gray-500">Keywords</span>
        </div>

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <CalendarDays size={12} className="text-gray-500" />

          <p className="mt-1 text-xs font-bold">
            {category.sortOrder}
          </p>

          <span className="text-[10px] text-gray-500">Order</span>
        </div>
      </div>

      {/* Keywords */}

      <div className="mt-3 flex gap-1 overflow-hidden">
        {category.keywords?.slice(0, 3).map((item, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-50 px-2 py-1 text-[10px] whitespace-nowrap text-gray-600 dark:bg-blue-900/30"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
