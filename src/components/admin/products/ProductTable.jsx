// 'use client';

// import Image from 'next/image';
// import { Edit, Trash2 } from 'lucide-react';
// import Link from 'next/link';

// export default function ProductTable({ products }) {
//   return (
//     <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
//       <table className="w-full table-fixed text-sm">
//         <thead className="border-b bg-gray-50 dark:bg-gray-800">
//           <tr className="h-14">
//             <th className="w-[80px] p-4 text-left">Image</th>

//             <th className="w-[30%] p-4 text-left">Name</th>

//             <th className="p-4 text-left">Category</th>

//             <th className="p-4 text-left">Price</th>

//             <th className="p-4 text-left">Stock</th>

//             <th className="p-4 text-left">Status</th>

//             <th className="p-4 text-center">Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.map((product) => (
//             <Link href={`/dashboard/products/${product._id}`}
//             className="h-14 border-b hover:bg-gray-50">
//               <tr
//                 key={product._id}

//               >
//                 <td className="p-4">
//                   <div className="relative h-12 w-12 overflow-hidden rounded-lg">
//                     <Image
//                       src={product.image}
//                       alt={product.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                 </td>

//                 <td className="truncate p-4 font-medium">
//                   {product.name}
//                 </td>

//                 <td className="p-4">{product.category}</td>

//                 <td className="p-4">
//                   {product.salePrice || product.price}
//                   {product.currency}
//                 </td>

//                 <td className="p-4">{product.stock}</td>

//                 <td className="p-4">
//                   <span
//                     className={`rounded-full px-3 py-1 text-xs ${
//                       product.inStock
//                         ? 'bg-green-100 text-green-700'
//                         : 'bg-red-100 text-red-700'
//                     } `}
//                   >
//                     {product.inStock ? 'Active' : 'Out'}
//                   </span>
//                 </td>

//                 <td className="p-4">
//                   <div className="flex justify-center gap-2">
//                     <button
//                       onClick={() => onEdit(product)}
//                       className="rounded p-2 hover:bg-gray-100"
//                     >
//                       <Edit size={17} />
//                     </button>

//                     <button
//                       onClick={() => onDelete(product.id)}
//                       className="rounded p-2 text-red-600 hover:bg-red-100"
//                     >
//                       <Trash2 size={17} />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             </Link>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductTable({ products, onEdit, onDelete }) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
              <th className="w-[90px] px-5 py-4 text-left">Image</th>

              <th className="px-5 py-4 text-left">Product</th>

              <th className="px-5 py-4 text-left">Category</th>

              <th className="px-5 py-4 text-left">Price</th>

              <th className="px-5 py-4 text-left">Stock</th>

              <th className="px-5 py-4 text-left">Status</th>
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

                <td className="px-5 py-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border">
                    <Image
                      src={product.image || 'images/placeholder.jpg'}

                      alt={product.name}

                      fill

                      className="object-cover"
                    />
                  </div>
                </td>

                {/* NAME */}

                <td className="p-2">
                  <div>
                    <p className="max-w-[220px] truncate font-semibold">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      SKU: {product.sku}
                    </p>
                  </div>
                </td>

                {/* CATEGORY */}

                <td className="px-5 py-4">
                  {product.categoryId?.name ||
                    product.category ||
                    '-'}
                </td>

                {/* PRICE */}

                <td className="px-5 py-4">
                  <span className="font-semibold">
                    {product.salePrice || product.price}
                  </span>

                  <span className="ml-1 text-xs text-gray-500">
                    {product.currency}
                  </span>
                </td>

                {/* STOCK */}

                <td className="px-5 py-4">{product.stock}</td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  {product.inStock ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
                      Out Of Stock
                    </span>
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
