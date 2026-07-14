'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function EmptyWishlist() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Heart size={80} className="text-primary mb-4" />

      <h2 className="mb-2 text-2xl font-bold">
        Your Wishlist is Empty
      </h2>

      <p className="mb-6 text-gray-500">
        Save your favorite products here.
      </p>

      <Link
        href="/products"
        className="bg-primary rounded-lg px-6 py-3 text-white"
      >
        Browse Products
      </Link>
    </div>
  );
}
