// 'use client';

// import Image from 'next/image';
// import { Heart, ShoppingCart } from 'lucide-react';

// export default function CategoryProductList({
//   products = [],
//   loading,
//   filteredProducts = [],
//   sort,
//   setSort,
//   wishlist = [],
//   toggleWishlist,
// }) {
//   return (
//     <section className="min-w-0 flex-1">
//       {/* Header */}

//       <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
//         <div>
//           <h2 className="text-xl font-bold">Products</h2>

//           <p className="text-sm text-gray-500">
//             {filteredProducts.length} items available
//           </p>
//         </div>

//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="rounded-lg border px-3 py-2 text-sm dark:bg-zinc-800"
//         >
//           <option value="default">Sort By</option>

//           <option value="low">Price Low</option>

//           <option value="high">Price High</option>
//         </select>
//       </div>

//       {/* Products Grid */}

//       <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
//         {loading ? (
//           <p>Loading products...</p>
//         ) : filteredProducts.length === 0 ? (
//           <p className="col-span-full text-center text-gray-500">
//             No products found
//           </p>
//         ) : (
//           filteredProducts.map((product) => (
//             <div
//               key={product._id}

//               className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900"
//             >
//               {/* Image */}

//               <div className="relative aspect-[3/4] overflow-hidden">
//                 <Image
//                   src={
//                     product.images?.[0]?.thumbnail
//                   }

//                   alt={product.name}

//                   fill

//                   sizes="
//                     (max-width:640px) 50vw,
//                     25vw
//                     "

//                   className="object-cover transition duration-500 group-hover:scale-110"
//                 />

//                 <button
//                   onClick={() => toggleWishlist(product._id)}

//                   className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
//                 >
//                   <Heart
//                     size={20}

//                     className={
//                       wishlist.includes(product._id)
//                         ? 'fill-red-500 text-red-500'
//                         : 'text-gray-700'
//                     }
//                   />
//                 </button>
//               </div>

//               {/* Content */}

//               <div className="p-4">
//                 <p className="text-xs text-gray-500">
//                   {product.brand}
//                 </p>

//                 <h3 className="mt-1 line-clamp-2 font-semibold">
//                   {product.name}
//                 </h3>

//                 <div className="mt-3">
//                   {product.salePrice ? (
//                     <>
//                       <span className="font-bold text-pink-500">
//                         Rs {product.salePrice}
//                       </span>

//                       <span className="ml-2 text-xs text-gray-400 line-through">
//                         Rs {product.price}
//                       </span>
//                     </>
//                   ) : (
//                     <span className="font-bold">
//                       Rs {product.price}
//                     </span>
//                   )}
//                 </div>

//                 <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2 text-sm text-white">
//                   <ShoppingCart size={16} />
//                   Add Cart
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </section>
//   );
// }

'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';

export default function CategoryProductList({
  filteredProducts = [],
  loading,
  sort,
  setSort,
  wishlist = [],
  toggleWishlist,
}) {
  return (
    <section className="min-w-0 flex-1">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm dark:bg-zinc-900">
        <div>
          <h2 className="text-xl font-bold">Products</h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredProducts.length} products available
          </p>
        </div>

        <select
          value={sort}

          onChange={(e) => setSort(e.target.value)}

          className="rounded-xl border px-4 py-2 text-sm outline-none dark:bg-zinc-800"
        >
          <option value="default">Sort By</option>

          <option value="low">Price Low to High</option>

          <option value="high">Price High to Low</option>
        </select>
      </div>

      {/* Product Grid */}

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-2xl bg-gray-200 dark:bg-zinc-800"
            />
          ))
        ) : filteredProducts.length === 0 ? (
          <p className="col-span-full py-20 text-center text-gray-500">
            No products found
          </p>
        ) : (
          filteredProducts.map((product) => (
            <article
              key={product._id}
              className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* IMAGE */}

              <div className="relative h-36 overflow-hidden rounded-t-2xl bg-gray-100 sm:h-52 md:h-48">
                <Image
                  src={
                    product.images?.[0]?.thumbnail ||
                    '/images/placeholder.jpg'
                  }

                  alt={product.name}

                  fill

                  sizes="
              (max-width:640px) 50vw,
              25vw
              "

                  className="object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Badge */}

                {product.badge && (
                  <span className="absolute top-3 left-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                    {product.badge}
                  </span>
                )}

                {/* Wishlist */}

                <button
                  onClick={() => toggleWishlist(product._id)}

                  className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur transition hover:scale-110"
                >
                  <Heart
                    size={20}

                    className={
                      wishlist.includes(product._id)
                        ? 'text-primary fill-gray-500'
                        : 'text-gray-700'
                    }
                  />
                </button>

                {/* Quick View */}

                {/* <Eye size={14} className="mr-1 inline" /> */}
                <button className="absolute bottom-3 left-1/2 hidden -translate-x-1/2 rounded-full bg-black px-4 py-2 text-xs text-white group-hover:block">
                  Quick View
                </button>
              </div>

              {/* CONTENT */}

              <div className="p-3">
                {/* Brand */}

                <p className="text-[11px] tracking-wide text-gray-400 uppercase">
                  {product.brand}
                </p>

                {/* Title */}

                {/* <h3 className="my-1 line-clamp-2 capitalize text-sm font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3> */}

                <h3 className="mt-1 line-clamp-2 text-sm leading-5 font-semibold dark:text-white">
                  {product.name}
                </h3>
                {/* Description */}

                <p className="line-clamp-2 text-xs text-gray-500">
                  {product.shortDescription || product.description}
                </p>

                {/* Rating */}

                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Star
                    size={14}
                    fill="currentColor"
                    className="text-yellow-400"
                  />

                  <span className="font-medium">4.8</span>

                  <span className="text-gray-400">(24)</span>
                </div>

                {/* Price */}

                <div className="mt-2">
                  {product.salePrice ? (
                    <div>
                      <span className="text-lg font-bold text-pink-600">
                        Rs {product.salePrice}
                      </span>

                      <span className="ml-2 text-sm text-gray-500 line-through">
                        Rs {product.price}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">
                      Rs {product.price}
                    </span>
                  )}
                </div>

                {/* Cart Button */}

                <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black">
                  <ShoppingCart size={17} />
                  Add To Cart
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
