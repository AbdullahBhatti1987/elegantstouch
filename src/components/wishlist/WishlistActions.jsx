'use client';

import Link from 'next/link';
import WishlistShare from './WishlistShare';
import WishlistMoveToCart from './WishlistMoveToCart';

export default function WishlistActions({
  totalItems,
  items,
  onMoveAll,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>

        <p className="text-gray-500">{totalItems} item(s) saved</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <WishlistShare items={items} />

        <WishlistMoveToCart
          onMoveAll={onMoveAll}
          disabled={!totalItems}
        />

        <Link
          href="/products"
          className="bg-primary rounded-lg px-4 py-2 text-white"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
