'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ProductTableSkeleton from '../common/skeleton/ProductTableSkeleton';

export default function ProductTable({ products, loading }) {
  const router = useRouter();

  return (
    <div className="w-full overflow-x-auto rounded-xl border bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full text-xs md:text-sm">
        <thead>
          <tr className="h-12 border-b bg-gray-50 text-gray-600 dark:border-gray-800 dark:bg-gray-800 dark:text-gray-300">
            <th className="px-1 py-3 text-center font-semibold md:px-2 md:py-3">
              Image
            </th>

            <th className="w-[100px] px-1 py-3 text-left font-semibold md:w-auto md:px-2">
              Product
            </th>

            <th className="hidden px-2 py-3 text-left font-semibold sm:table-cell">
              Category
            </th>

            <th className="hidden px-2 py-3 text-left font-semibold md:table-cell">
              Brand
            </th>

            <th className="hidden px-2 py-3 text-left font-semibold lg:table-cell">
              Collection
            </th>

            <th className="px-1 py-3 text-left font-semibold md:px-2">
              Price
            </th>

            <th className="px-1 py-3 text-left font-semibold md:px-2">
              Stock
            </th>

            <th className="px-1 py-3 text-left font-semibold md:px-2">
              Status
            </th>

            <th className="hidden px-1 py-3 text-left font-semibold sm:table-cell md:px-2">
              Featured
            </th>
          </tr>
        </thead>
        {loading ? (
          <ProductTableSkeleton rows={10} />
        ) : (
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                onClick={() =>
                  router.push(`/dashboard/products/${product._id}`)
                }
                className="h-16 cursor-pointer border-b transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
              >
                {/* IMAGE */}

                <td className="px-1 py-1 md:px-3 md:py-3">
                  <div className="relative mx-auto h-10 w-10 overflow-hidden rounded-lg border">
                    <Image
                      src={
                        product.thumbnail?.url ||
                        '/images/placeholder.jpg'
                      }
                      alt={product.name || 'product'}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                </td>

                {/* PRODUCT */}

                <td className="max-w-[100px] px-1 py-3 md:w-auto md:max-w-[180px] md:px-3">
                  <p className="truncate font-semibold">
                    {product.name}
                  </p>

                  <p className="text-[10px] text-gray-500 md:text-xs">
                    SKU: {product.sku}
                  </p>
                </td>

                {/* <td className="px-2 py-2">
                {product.badge && (
                  <span className="mt-1 inline-block rounded-full bg-yellow-100 px-2 py-0.5 text-[10px] text-yellow-700">
                    {product.badge}
                  </span>
                )}
              </td> */}

                {/* CATEGORY */}

                <td className="hidden px-1 py-3 sm:table-cell md:px-3 md:py-3">
                  {product.categoryId?.name || '-'}
                </td>

                {/* BRAND */}

                <td className="hidden px-1 py-3 md:table-cell md:px-3 md:py-3">
                  {product.brand || '-'}
                </td>

                {/* COLLECTION */}

                <td className="hidden px-2 lg:table-cell">
                  {product.collectionName || '-'}
                </td>

                {/* PRICE */}

                <td className="px-2">
                  {product.salePrice ? (
                    <>
                      <p className="font-semibold">
                        {product.salePrice}
                      </p>

                      <p className="text-[10px] text-gray-400 line-through">
                        {product.price}
                      </p>
                    </>
                  ) : (
                    <p className="font-semibold">{product.price}</p>
                  )}
                </td>

                {/* STOCK */}

                <td className="px-2">
                  <p>{product.stock}</p>

                  {product.stock <= 5 && (
                    <span className="text-[10px] text-red-500">
                      Low
                    </span>
                  )}
                </td>

                {/* STATUS */}

                <td className="px-2">
                  {product.inStock ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] text-green-700">
                      In
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-[10px] text-red-700">
                      Out
                    </span>
                  )}
                </td>

                {/* FEATURED */}

                <td className="hidden px-2 md:table-cell">
                  {product.featured ? (
                    <span className="rounded-full bg-blue-100 px-2 py-1 text-[10px] text-blue-700">
                      Yes
                    </span>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
