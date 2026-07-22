'use client';

import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({
  product,
  showWishlistButton = true,
  addToWishlist,
  isInWishlist = false,
  removeFromWishlist,
  showCartButton = true,
  showRating = true,
  onClick,
  addToCart,
  isInCart = false,
}) {
  return (
    <article className="group cursor-pointer rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      {/* IMAGE */}

      <div
        className="relative h-36 overflow-hidden rounded-t-2xl bg-gray-100 sm:h-52"
        onClick={onClick}
      >
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

        {showWishlistButton && (
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (isInWishlist) {
                removeFromWishlist(product._id);
              } else {
                addToWishlist(product);
              }
            }}
            className="absolute top-3 right-3 flex h-8 w-8  cursor-pointer items-center justify-center rounded-full bg-white/80 shadow"
          >
            <Heart
              size={20}
              className={
                isInWishlist
                  ? 'fill-primary text-primary'
                  : 'text-gray-700'
              }
            />
          </button>
        )}
      </div>

      {/* CONTENT */}

      <div className="p-3">
        <p className="line-clamp-1 text-[11px] tracking-wide text-gray-400 uppercase">
          {product.brand}
        </p>

        <h3 className="mt-1 line-clamp-1 text-sm font-semibold">
          {product.name}
        </h3>

        <p className="line-clamp-1 text-xs text-gray-500">
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
            onClick={() => {
              addToCart(product, 1);
            }}
            disabled={isInCart}
            className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white transition ${
              isInCart
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-black hover:bg-zinc-800'
            }`}
          >
            <ShoppingCart size={17} />

            {isInCart ? 'Already In Cart' : 'Add To Cart'}
          </button>
        )}
      </div>
    </article>
  );
}
