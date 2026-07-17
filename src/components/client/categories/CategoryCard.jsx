// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// export default function CategoryCard({ category }) {
//   const [imageLoading, setImageLoading] = useState(true);

//   return (
//     <Link
//       href={`/categories/${category.slug}`}
//       className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-zinc-900"
//     >
//       {/* IMAGE */}

//       <div className="relative h-52 overflow-hidden">
//         {imageLoading && (
//           <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-800" />
//         )}

//         <Image
//           src={category.image.url || '/images/placeholder.jpg'}

//           alt={category.alt || category.name}

//           fill

//           sizes="
//           (max-width:640px) 50vw,
//           (max-width:1024px) 33vw,
//           25vw
//           "

//           onLoad={() => setImageLoading(false)}

//           className="object-cover transition duration-500 group-hover:scale-110"
//         />

//         {/* Overlay */}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

//         <h2 className="absolute bottom-5 left-5 text-xl font-bold text-white capitalize">
//           {category.name}
//         </h2>
//       </div>

//       {/* CONTENT */}

//       {/* <div className="p-5">
//         <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
//           {category.description || 'Explore our latest collection'}
//         </p> */}

//         {/* <div className="mt-4 flex items-center justify-between">
//           <span className="text-sm font-medium text-black dark:text-white">
//             View Products
//           </span>

//           <span className="text-lg transition group-hover:translate-x-1">
//             →
//           </span>
//         </div> */}
//       {/* </div> */}
//     </Link>

//   );
// }

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({
  product,
  wishlist,
  toggleWishlist,
}) {
  const isWishlisted = wishlist.includes(product._id);

  return (
    <div className="group overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      {/* IMAGE */}

      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.thumbnail?.url || '/images/placeholder.jpg'}
            alt={product.name}
            fill
            sizes="
            (max-width:640px) 50vw,
            (max-width:1024px) 33vw,
            25vw
            "
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        {/* SALE */}

        {product.salePrice && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>
        )}

        {/* BADGE */}

        {product.badge && (
          <span className="absolute bottom-3 left-3 rounded-full bg-black/80 px-3 py-1 text-xs text-white">
            {product.badge}
          </span>
        )}

        {/* WISHLIST */}

        <button
          onClick={() => toggleWishlist(product._id)}
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-110"
        >
          <Heart
            size={20}
            className={
              isWishlisted
                ? 'fill-red-500 text-red-500'
                : 'text-gray-700'
            }
          />
        </button>
      </div>

      {/* CONTENT */}

      <div className="p-4">
        {/* BRAND */}

        <p className="text-xs tracking-wide text-gray-400 uppercase">
          {product.brand}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[48px] font-semibold text-gray-800 hover:text-pink-500 dark:text-white">
            {product.name}
          </h3>
        </Link>

        {/* COLLECTION */}

        {product.collection && (
          <p className="mt-1 text-xs text-gray-500">
            Collection:
            <span className="ml-1 font-medium">
              {product.collection}
            </span>
          </p>
        )}

        {/* RATING */}

        <div className="mt-3 flex items-center gap-1">
          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm">4.8</span>

          <span className="text-xs text-gray-400">(120)</span>
        </div>

        {/* PRICE */}

        <div className="mt-3">
          {product.salePrice ? (
            <div>
              <span className="text-lg font-bold text-pink-500">
                Rs {product.salePrice}
              </span>

              <span className="ml-2 text-sm text-gray-400 line-through">
                Rs {product.price}
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold">
              Rs {product.price}
            </span>
          )}
        </div>

        {/* STOCK */}

        <p className="mt-2 text-xs">
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </p>

        {/* CART */}

        <button
          disabled={!product.inStock}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:bg-gray-400"
        >
          <ShoppingCart size={16} />

          {product.inStock ? 'Add To Cart' : 'Out Of Stock'}
        </button>
      </div>
    </div>
  );
}
