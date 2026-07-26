'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductListCard({
  product,
  addToWishlist,
  isInWishlist = false,
  removeFromWishlist,
  addToCart,
  isInCart = false,
  onClick,
}) {
  return (
    <article className="group flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-lg sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
      {/* IMAGE */}

      <div
        onClick={onClick}
        className="relative h-48 w-full shrink-0 cursor-pointer overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-36"
      >
        <Image
          src={
            product.images?.[0]?.thumbnail ||
            '/images/placeholder.jpg'
          }
          alt={product.name}
          fill
          sizes="150px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Badge */}

        {product.badge && (
          <span className="absolute top-2 left-2 rounded-full bg-pink-500 px-2 py-1 text-xs text-white">
            {product.badge}
          </span>
        )}
      </div>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <p className="text-xs tracking-wide text-gray-400 uppercase">
            {product.brand}
          </p>

          <h3
            onClick={onClick}
            className="mt-1 cursor-pointer text-lg font-semibold hover:text-pink-500"
          >
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-gray-500">
            {product.shortDescription || product.description}
          </p>

          {/* Rating */}

          <div className="mt-3 flex items-center gap-1 text-sm">
            <Star
              size={15}
              fill="currentColor"
              className="text-yellow-400"
            />

            <span>4.8</span>

            <span className="text-gray-400">(24)</span>
          </div>

          {/* Price */}

          <div className="mt-3">
            {product.salePrice ? (
              <>
                <span className="text-xl font-bold text-pink-600">
                  Rs {product.salePrice}
                </span>

                <span className="ml-2 text-sm text-gray-400 line-through">
                  Rs {product.price}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">
                Rs {product.price}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ACTIONS */}

      <div className="flex items-center gap-2 sm:flex-col sm:justify-center">
        {/* Wishlist */}

        <button
          onClick={() => {
            if (isInWishlist) {
              removeFromWishlist(product._id);
            } else {
              addToWishlist(product);
            }
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          <Heart
            size={20}
            className={
              isInWishlist ? 'fill-red-500 text-red-500' : ''
            }
          />
        </button>

        {/* Cart */}

        <button
          onClick={() => addToCart(product, 1)}
          disabled={isInCart}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-white ${
            isInCart
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-black hover:bg-zinc-800'
          } `}
        >
          <ShoppingCart size={17} />

          {isInCart ? 'Added' : 'Add Cart'}
        </button>
      </div>
    </article>
  );
}
