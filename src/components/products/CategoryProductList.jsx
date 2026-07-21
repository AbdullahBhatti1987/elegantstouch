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

import ProductCard from './ProductCard';
import { useRouter } from 'next/navigation';

export default function CategoryProductList({
  filteredProducts = [],
  loading,
  sort,
  setSort,
  wishlist = [],
  toggleWishlist,
  addToCart,
}) {
  const router = useRouter();
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
            <ProductCard
              key={product._id}
              product={product}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              addToCart={addToCart}
              onClick={() => router.push(`/products/${product._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
}
