// // 'use client';

// // import Image from 'next/image';

// // export default function ProductCard({ product }) {
// //   return (
// //     <div className="overflow-hidden rounded-xl border bg-white dark:bg-gray-900">
// //       {/* Image */}

// //       <div className="relative h-40">
// //         <Image
// //           src={product.image}
// //           alt={product.name}
// //           fill
// //           className="object-cover"
// //         />
// //       </div>

// //       {/* Content */}

// //       <div className="p-4">
// //         <div className="flex justify-between">
// //           <h3 className="truncate font-semibold">{product.name}</h3>

// //           {product.badge && (
// //             <span className="rounded bg-yellow-100 px-2 py-1 text-xs">
// //               {product.badge}
// //             </span>
// //           )}
// //         </div>

// //         <p className="mt-2 text-sm text-gray-500">
// //           {product.categoryId?.name}
// //         </p>

// //         <div className="mt-3">
// //           <span className="font-bold">
// //             {product.salePrice || product.price}
// //           </span>

// //           <span className="ml-1 text-sm">{product.currency}</span>
// //         </div>

// //         <div className="mt-2 text-sm">
// //           Stock:
// //           <b className="ml-1">{product.stock}</b>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';

// export default function AdminProductCard({ product }) {
//   return (
//     <Link
//       href={`/dashboard/products/${product._id}`}
//       className="relative block overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
//     >
//       {/* Status */}
//       <div className="absolute top-3 left-3 z-50">
//         <span
//           className={`rounded-full px-3 py-1 text-xs font-semibold ${
//             product.status === 'active'
//               ? 'bg-green-100 text-green-700'
//               : 'bg-red-100 text-red-700'
//           } `}
//         >
//           {product.status}
//         </span>
//       </div>

//       {/* Image */}

//       <div className="relative h-48">
//         <Image
//           src={product.thumbnail?.url || '/images/placeholder.jpg'}
//           alt={product.name}
//           fill
//           sizes="
//             (max-width: 640px) 100vw,
//             (max-width: 768px) 50vw,
//             (max-width: 1280px) 33vw,
//             25vw
//           "
//           className="object-cover transition duration-500 hover:scale-105"
//         />
//       </div>

//       {/* Content */}

//       <div className="p-4">
//         <div className="flex justify-between gap-2">
//           <h3 className="truncate font-semibold">{product.name}</h3>

//           {product.badge && (
//             <span className="rounded bg-yellow-100 px-2 py-1 text-xs">
//               {product.badge}
//             </span>
//           )}
//         </div>

//         <p className="mt-2 text-sm text-gray-500">
//           {product.categoryId?.name}
//         </p>

//         <div className="mt-3">
//           <span className="font-bold">
//             {product.salePrice || product.price}
//           </span>

//           <span className="ml-1 text-sm">{product.currency}</span>
//         </div>

//         <div className="mt-2 text-sm">
//           Stock:
//           <b className="ml-1">{product.stock}</b>
//         </div>
//       </div>
//     </Link>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Tag, Package, CalendarDays, Star } from 'lucide-react';

export default function AdminProductCard({ product }) {
  return (
    <Link
      href={`/dashboard/products/${product._id}`}
      className="group block rounded-2xl border border-gray-400 bg-white p-3 shadow-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900"
    >
      {/* Top Section */}

      <div className="flex gap-3">
        {/* Image */}

        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
          <Image
            src={product.thumbnail?.url || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            priority
            sizes="96px"
            className="object-cover transition duration-500 group-hover:scale-110"
          />

          {product.featured && (
            <div className="absolute top-1 left-1 rounded-full bg-yellow-400 p-1">
              <Star size={11} fill="black" />
            </div>
          )}
        </div>

        {/* Product Info */}

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-bold text-gray-900 dark:text-white">
            {product.name}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
            <Tag size={12} />
            {product.categoryId?.name}
          </div>

          <span
            className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              product.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            } `}
          >
            {product.status}
          </span>
        </div>
      </div>

      {/* Details */}

      <div className="mt-3 grid grid-cols-3 gap-2">
        {/* Price */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-[10px] text-gray-500">Price</p>

          <p className="text-xs font-bold">
            {product.salePrice || product.price} {product.currency}
          </p>
        </div>

        {/* Stock */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <div className="flex items-center gap-1">
            <Package size={12} />
            <span className="text-[10px] text-gray-500">Stock</span>
          </div>

          <p className="mt-1 text-xs font-bold">{product.stock}</p>
        </div>

        {/* Badge */}

        <div className="rounded-lg bg-gray-50 p-2 dark:bg-gray-800">
          <p className="text-[10px] text-gray-500">Badge</p>

          <p className="truncate text-xs font-bold">
            {product.badge || '-'}
          </p>
        </div>
      </div>

      {/* Description */}

      <p className="mt-3 line-clamp-2 text-xs text-gray-600 dark:text-gray-400">
        {product.shortDescription}
      </p>

      {/* Footer */}

      <div className="mt-3 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <CalendarDays size={13} />

          {new Date(product.createdAt).toLocaleDateString()}
        </div>

        <span>SKU: {product.sku}</span>
      </div>
    </Link>
  );
}
