// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import { Heart, ShoppingCart, Minus, Plus, Star } from 'lucide-react';

// export default function ProductDetails({
//   product,
//   wishlist = [],
//   toggleWishlist,
//   addToCart,
// }) {
//   const images = product?.images || [];

//   const [activeImage, setActiveImage] = useState(
//     images[0]?.url || '/images/placeholder.jpg',
//   );

//   const [quantity, setQuantity] = useState(1);

//   const isWishlisted = wishlist.includes(product._id);

//   const increaseQty = () => {
//     if (quantity < product.stock) {
//       setQuantity(quantity + 1);
//     }
//   };

//   const decreaseQty = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };

//   return (
//     <section className="mx-auto max-w-6xl px-4 py-8">
//       <div className="grid items-start gap-6 lg:grid-cols-2">
//         {/* ================= IMAGE GALLERY ================= */}

//         <div className="flex flex-col-reverse gap-4 md:flex-row">
//           {/* THUMBNAILS */}

//           <div className="flex gap-3 md:flex-col">
//             {images.slice(0, 5).map((img, index) => (
//               <button
//                 key={index}
//                 onClick={() => setActiveImage(img.url)}
//                 className={`relative h-20 w-20 overflow-hidden rounded-xl border ${
//                   activeImage === img.url
//                     ? 'border-black'
//                     : 'border-gray-200'
//                 } `}
//               >
//                 <Image
//                   src={img.thumbnail || img.url}
//                   alt={product.name}
//                   fill
//                   sizes="480px"
//                   className="object-cover"
//                 />
//               </button>
//             ))}
//           </div>

//           {/* MAIN IMAGE */}

//           <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-gray-100">
//             <Image
//               src={activeImage}

//               alt={product.name}

//               fill

//               priority

//               className="object-cover"
//             />
//           </div>
//         </div>

//         {/* ================= PRODUCT INFO ================= */}

//         <div>
//           {/* Brand */}

//           <p className="text-sm tracking-widest text-gray-400 uppercase">
//             {product.brand}
//           </p>

//           {/* Title */}

//           <h1 className="mt-2 text-2xl font-bold dark:text-white">
//             {product.name}
//           </h1>

//           {/* Rating */}

//           <div className="mt-4 flex items-center gap-2">
//             <div className="flex items-center gap-1 text-yellow-400">
//               <Star size={18} fill="currentColor" />

//               <Star size={18} fill="currentColor" />

//               <Star size={18} fill="currentColor" />

//               <Star size={18} fill="currentColor" />

//               <Star size={18} />
//             </div>

//             <span className="text-sm text-gray-500">
//               4.8 (120 reviews)
//             </span>
//           </div>

//           {/* PRICE */}

//           <div className="mt-5">
//             {product.salePrice ? (
//               <div>
//                 <span className="text-2xl font-bold text-pink-600">
//                   Rs {product.salePrice}
//                 </span>

//                 <span className="ml-3 text-lg text-gray-400 line-through">
//                   Rs {product.price}
//                 </span>
//               </div>
//             ) : (
//               <span className="text-2xl font-bold">
//                 Rs {product.price}
//               </span>
//             )}
//           </div>

//           {/* STOCK */}

//           <div className="mt-4">
//             {product.stock > 0 ? (
//               <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
//                 In Stock
//               </span>
//             ) : (
//               <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
//                 Out Of Stock
//               </span>
//             )}
//           </div>

//           {/* DESCRIPTION */}

//           <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
//             {product.description}
//           </p>

//           {/* FEATURES */}

//           <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
//             <Info title="Material" value={product.material} />

//             <Info title="Color" value={product.color} />

//             <Info title="Age Group" value={product.ageGroup} />

//             <Info title="Weight" value={product.weight} />
//           </div>

//           {/* ACTIONS */}

//           <div className="mt-2 flex gap-3">
//             {/* Quantity */}

//             <div className="flex items-center rounded-xl border">
//               <button onClick={decreaseQty} className="p-3">
//                 <Minus size={18} />
//               </button>

//               <span className="w-10 text-center">{quantity}</span>

//               <button onClick={increaseQty} className="p-3">
//                 <Plus size={18} />
//               </button>
//             </div>

//             {/* Wishlist */}

//             <button
//               onClick={() => toggleWishlist(product._id)}

//               className="flex h-12 w-12 items-center justify-center rounded-xl border"
//             >
//               <Heart
//                 size={22}

//                 className={
//                   isWishlisted
//                     ? 'fill-primary text-primary'
//                     : 'text-gray-600'
//                 }
//               />
//             </button>
//           </div>

//           {/* ADD CART */}

//           <button
//             onClick={() => addToCart(product, quantity)}

//             className="mt-4 flex w-full items-center justify-center gap-3 rounded-xl bg-black py-3 font-semibold text-white hover:bg-zinc-800"
//           >
//             <ShoppingCart size={20} />
//             Add To Cart
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }
// function Info({ title, value }) {
//   return (
//     <div className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3 dark:bg-zinc-800">
//       <p className="text-sm text-gray-400">{title}:</p>

//       <p className="text-right text-sm font-medium">{value || '-'}</p>
//     </div>
//   );
// }

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Minus, Plus, Star } from 'lucide-react';

export default function ProductDetails({
  product,
  wishlist = [],
  toggleWishlist,
  addToCart,
}) {
  const images = product?.images || [];

  const [activeImage, setActiveImage] = useState(
    images[0]?.url || '/images/placeholder.jpg',
  );

  const [quantity, setQuantity] = useState(1);

  const isWishlisted = wishlist.includes(product._id);

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-3 py-6 sm:px-5 lg:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        {/* IMAGE SECTION */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          {/* THUMBNAILS */}

          <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
            {images.slice(0, 5).map((img, index) => (
              <button
                key={index}

                onClick={() => setActiveImage(img.url)}

                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border sm:h-20 sm:w-20 ${
                  activeImage === img.url
                    ? 'border-black'
                    : 'border-gray-200'
                } `}
              >
                <Image
                  src={img.thumbnail || img.url}

                  alt={product.name}

                  fill

                  sizes="80px"

                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}

          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 sm:max-w-md">
            <Image
              src={activeImage}

              alt={product.name}

              fill

              priority

              sizes="
                (max-width:640px) 100vw,
                50vw
              "

              className="object-cover"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}

        <div className="space-y-4">
          <p className="text-xs tracking-widest text-gray-400 uppercase sm:text-sm">
            {product.brand}
          </p>

          <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
            {product.name}
          </h1>

          {/* RATING */}

          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}

                  size={16}

                  fill={i < 4 ? 'currentColor' : 'none'}
                />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              4.8 (120 reviews)
            </span>
          </div>

          {/* PRICE */}

          <div>
            {product.salePrice ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xl font-bold text-pink-600 sm:text-2xl">
                  Rs {product.salePrice}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  Rs {product.price}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold sm:text-2xl">
                Rs {product.price}
              </span>
            )}
          </div>

          {/* STOCK */}

          <div>
            <span
              className={`inline-block rounded-full px-3 py-1 text-xs ${
                product.stock > 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              } `}
            >
              {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
            </span>
          </div>

          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          {/* INFO */}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Info title="Material" value={product.material} />

            <Info title="Color" value={product.color} />

            <Info title="Age Group" value={product.ageGroup} />

            <Info title="Weight" value={product.weight} />
          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-3">
            {/* QUANTITY */}

            <div className="flex items-center rounded-xl border">
              <button onClick={decreaseQty} className="p-3">
                <Minus size={17} />
              </button>

              <span className="w-8 text-center">{quantity}</span>

              <button onClick={increaseQty} className="p-3">
                <Plus size={17} />
              </button>
            </div>

            {/* WISHLIST */}

            <button
              onClick={() => toggleWishlist(product._id)}

              className="flex h-12 w-12 items-center justify-center rounded-xl border"
            >
              <Heart
                size={22}

                className={
                  isWishlisted
                    ? 'fill-primary text-primary'
                    : 'text-gray-600'
                }
              />
            </button>
          </div>

          {/* CART */}

          <button
            onClick={() => addToCart(product, quantity)}

            className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:text-base"
          >
            <ShoppingCart size={18} />
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}

function Info({ title, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 dark:bg-zinc-800">
      <p className="text-sm text-gray-400">{title}</p>

      <p className="max-w-[60%] text-right text-sm font-medium">
        {value || '-'}
      </p>
    </div>
  );
}
