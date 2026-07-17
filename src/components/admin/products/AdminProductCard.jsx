// 'use client';

// import Image from 'next/image';

// export default function ProductCard({ product }) {
//   return (
//     <div className="overflow-hidden rounded-xl border bg-white dark:bg-gray-900">
//       {/* Image */}

//       <div className="relative h-40">
//         <Image
//           src={product.image}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>

//       {/* Content */}

//       <div className="p-4">
//         <div className="flex justify-between">
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
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AdminProductCard({ product }) {
  return (
    <Link
      href={`/dashboard/products/${product._id}`}
      className="relative block overflow-hidden rounded-xl border bg-white transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
    >
      {/* Status */}
      <div className="absolute top-3 left-3 z-50">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            product.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          } `}
        >
          {product.status}
        </span>
      </div>


      {/* Image */}

      <div className="relative h-48">
        <Image
          src={product.thumbnail?.url || '/images/placeholder.jpg'}
          alt={product.name}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 768px) 50vw,
            (max-width: 1280px) 33vw,
            25vw
          "
          className="object-cover transition duration-500 hover:scale-105"
        />
      </div>

      {/* Content */}

      <div className="p-4">
        <div className="flex justify-between gap-2">
          <h3 className="truncate font-semibold">{product.name}</h3>

          {product.badge && (
            <span className="rounded bg-yellow-100 px-2 py-1 text-xs">
              {product.badge}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {product.categoryId?.name}
        </p>

        <div className="mt-3">
          <span className="font-bold">
            {product.salePrice || product.price}
          </span>

          <span className="ml-1 text-sm">{product.currency}</span>
        </div>

        <div className="mt-2 text-sm">
          Stock:
          <b className="ml-1">{product.stock}</b>
        </div>
      </div>
    </Link>
  );
}
