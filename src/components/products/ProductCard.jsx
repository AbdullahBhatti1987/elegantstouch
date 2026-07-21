// 'use client';

// import Image from 'next/image';
// import { Heart, ShoppingCart, Star } from 'lucide-react';

// export default function ProductCard({
//   product,
//   wishlist = [],
//   toggleWishlist,
//   showCartButton = true,
//   showRating = true,
//   onClick,
// }) {
//   const isWishlisted = wishlist.includes(product._id);

//   return (
//     <article
//       onClick={onClick}
//       className="group rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
//     >
//       {/* IMAGE */}

//       <div className="relative h-36 overflow-hidden rounded-t-2xl bg-gray-100 sm:h-52">
//         <Image
//           src={
//             product.images?.[0]?.thumbnail ||
//             '/images/placeholder.jpg'
//           }
//           alt={product.name}
//           fill
//           sizes="
//           (max-width:640px) 50vw,
//           25vw
//           "
//           className="object-cover transition duration-500 group-hover:scale-105"
//         />

//         {/* Badge */}

//         {product.badge && (
//           <span className="absolute top-3 left-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
//             {product.badge}
//           </span>
//         )}

//         {/* Wishlist */}

//         {toggleWishlist && (
//           <button
//             onClick={() => toggleWishlist(product._id)}
//             className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow backdrop-blur transition hover:scale-110"
//           >
//             <Heart
//               size={20}
//               className={
//                 isWishlisted
//                   ? 'text-primary fill-primary'
//                   : 'text-gray-700'
//               }
//             />
//           </button>
//         )}
//       </div>

//       {/* CONTENT */}

//       <div className="p-3">
//         <p className="text-[11px] tracking-wide text-gray-400 uppercase">
//           {product.brand}
//         </p>

//         <h3 className="mt-1 line-clamp-2 text-sm leading-5 font-semibold dark:text-white">
//           {product.name}
//         </h3>

//         <p className="line-clamp-2 text-xs text-gray-500">
//           {product.shortDescription || product.description}
//         </p>

//         {/* Rating */}

//         {showRating && (
//           <div className="mt-2 flex items-center gap-1 text-xs">
//             <Star
//               size={14}
//               fill="currentColor"
//               className="text-yellow-400"
//             />

//             <span className="font-medium">4.8</span>

//             <span className="text-gray-400">(24)</span>
//           </div>
//         )}

//         {/* PRICE */}

//         <div className="mt-2">
//           {product.salePrice ? (
//             <div>
//               <span className="text-lg font-bold text-pink-600">
//                 Rs {product.salePrice}
//               </span>

//               <span className="ml-2 text-sm text-gray-500 line-through">
//                 Rs {product.price}
//               </span>
//             </div>
//           ) : (
//             <span className="text-lg font-bold">
//               Rs {product.price}
//             </span>
//           )}
//         </div>

//         {/* CART BUTTON */}

//         {showCartButton && (
//           <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black">
//             <ShoppingCart size={17} />
//             Add To Cart
//           </button>
//         )}
//       </div>
//     </article>
//   );
// }

'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({
  product,
  wishlist = [],
  toggleWishlist,
  showCartButton = true,
  showRating = true,
  onClick,
  addToCart,
}) {
  const isWishlisted = wishlist.includes(product._id);

  const handleCartClick = (e) => {
    // card click prevent karega
    e.stopPropagation();

    addToCart(product, 1);
  };

  return (
    <article
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* IMAGE */}

      <div className="relative h-36 overflow-hidden rounded-t-2xl bg-gray-100 sm:h-52">
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

        {/* BADGE */}

        {product.badge && (
          <span className="absolute top-3 left-3 rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
            {product.badge}
          </span>
        )}

        {/* WISHLIST */}

        {toggleWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              toggleWishlist(product._id);
            }}
            className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 shadow"
          >
            <Heart
              size={20}

              className={
                isWishlisted
                  ? 'fill-primary text-primary'
                  : 'text-gray-700'
              }
            />
          </button>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-3">
        <p className="text-[11px] tracking-wide text-gray-400 uppercase">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-2 text-sm font-semibold">
          {product.name}
        </h3>

        <p className="line-clamp-2 text-xs text-gray-500">
          {product.shortDescription || product.description}
        </p>

        {showRating && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            <Star
              size={14}
              fill="currentColor"
              className="text-yellow-400"
            />

            <span>4.8</span>

            <span className="text-gray-400">(24)</span>
          </div>
        )}

        {/* PRICE */}

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

        {/* CART BUTTON */}

        {showCartButton && (
          <button
            onClick={handleCartClick}

            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-medium text-white hover:bg-zinc-800"
          >
            <ShoppingCart size={17} />
            Add To Cart
          </button>
        )}
      </div>
    </article>
  );
}
