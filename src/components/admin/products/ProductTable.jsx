// 'use client';

// import Image from 'next/image';
// import { Edit, Trash2, Eye } from 'lucide-react';
// import { useRouter } from 'next/navigation';

// export default function ProductTable({ products, onEdit, onDelete }) {
//   const router = useRouter();

//   return (
//     <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
//       <div className="overflow-x-auto">
//         <table className="w-full text-sm">
//           <thead>
//             <tr className="border-b bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
//               <th className="w-[90px] px-5 py-2 text-left">Image</th>

//               <th className="px-5 py-4 text-left">Product</th>

//               <th className="px-5 py-4 text-left">Category</th>

//               <th className="px-5 py-4 text-left">Price</th>

//               <th className="px-5 py-4 text-left">Stock</th>

//               <th className="px-5 py-4 text-left">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr
//                 key={product._id}

//                 onClick={() =>
//                   router.push(`/dashboard/products/${product._id}`)
//                 }

//                 className="cursor-pointer border-b transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
//               >
//                 {/* IMAGE */}

//                 <td className="px-5 py-2">
//                   <div className="relative h-12 w-12 overflow-hidden rounded-xl border">
//                     <Image
//                       src={product.thumbnail?.url || 'images/placeholder.jpg'}

//                       alt={product.name}

//                       fill

//                       className="object-cover"
//                     />
//                   </div>
//                 </td>

//                 {/* NAME */}

//                 <td className="p-2">
//                   <div>
//                     <p className="max-w-[220px] truncate font-semibold">
//                       {product.name}
//                     </p>

//                     <p className="mt-1 text-xs text-gray-500">
//                       SKU: {product.sku}
//                     </p>
//                   </div>
//                 </td>

//                 {/* CATEGORY */}

//                 <td className="px-5 py-4">
//                   {product.categoryId?.name ||
//                     product.category ||
//                     '-'}
//                 </td>

//                 {/* PRICE */}

//                 <td className="px-5 py-4">
//                   <span className="font-semibold">
//                     {product.salePrice || product.price}
//                   </span>

//                   <span className="ml-1 text-xs text-gray-500">
//                     {product.currency}
//                   </span>
//                 </td>

//                 {/* STOCK */}

//                 <td className="px-5 py-4">{product.stock}</td>

//                 {/* STATUS */}

//                 <td className="px-5 py-4">
//                   {product.inStock ? (
//                     <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
//                       Active
//                     </span>
//                   ) : (
//                     <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
//                       Out Of Stock
//                     </span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ProductTable({ products, onEdit, onDelete }) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
              <th className="px-5 py-4 text-left">Image</th>

              <th className="px-5 py-4 text-left">Product</th>

              <th className="px-5 py-4 text-left">Category</th>

              <th className="px-5 py-4 text-left">Brand</th>

              <th className="px-5 py-4 text-left">Collection Name</th>

              <th className="px-5 py-4 text-left">Price</th>

              <th className="px-5 py-4 text-left">Stock</th>

              <th className="px-5 py-4 text-left">Status</th>

              <th className="px-5 py-4 text-left">Featured</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}

                onClick={() =>
                  router.push(`/dashboard/products/${product._id}`)
                }

                className="cursor-pointer border-b transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* IMAGE */}

                <td className="px-5 py-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-xl border">
                    <Image
                      src={
                        product.thumbnail?.url ||
                        // product.images?.[0]?.thumbnail ||
                        '/images/placeholder.jpg'
                      }
                      sizes="48px"
                      alt={product.name || 'product'}
                      fill priority
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* PRODUCT */}

                <td className="px-5 py-4">
                  <p className="max-w-[220px] truncate font-semibold">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    SKU: {product.sku}
                  </p>

                  {product.badge && (
                    <span className="mt-2 inline-block rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                      {product.badge}
                    </span>
                  )}
                </td>

                {/* CATEGORY */}

                <td className="px-5 py-4">
                  {product.categoryId?.name || '-'}
                </td>

                {/* BRAND */}

                <td className="px-5 py-4">{product.brand || '-'}</td>

                {/* COLLECTION */}

                <td className="px-5 py-4">
                  {product.collectionName || '-'}
                </td>

                {/* PRICE */}

                <td className="px-5 py-4">
                  {product.salePrice ? (
                    <>
                      <p className="font-semibold">
                        {product.salePrice} {product.currency}
                      </p>

                      <p className="text-xs text-gray-400 line-through">
                        {product.price}
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold">
                      {product.price} {product.currency}
                    </p>
                  )}
                </td>

                {/* STOCK */}

                <td className="px-5 py-4">
                  <p>{product.stock}</p>

                  {product.stock <= 5 && (
                    <span className="text-xs text-red-500">
                      Low Stock
                    </span>
                  )}
                </td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  {product.inStock ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                      Available
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs text-red-700">
                      Out
                    </span>
                  )}
                </td>

                {/* FEATURED */}

                <td className="px-5 py-4">
                  {product.featured ? (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700">
                      Featured
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
