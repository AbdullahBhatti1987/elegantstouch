'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';

export default function WishlistItem({
  item,
  onRemove,
  onAddToCart,
}) {
  return (
    <div className="group overflow-hidden rounded-xl border bg-white transition hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <button
          onClick={onRemove}
          className="absolute top-3 right-3 rounded-full bg-white p-2 shadow"
        >
          <Heart size={16} 
          fill=''/>
        </button>
      </div>

      <div className="p-4">
        <Link
          href={`/products/${item.slug}`}
          className="line-clamp-2 font-semibold"
        >
          {item.name}
        </Link>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-primary text-lg font-bold">
            Rs. {item.price}
          </span>

          {item.oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {item.oldPrice}
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className="bg-primary mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-white"
        >
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
