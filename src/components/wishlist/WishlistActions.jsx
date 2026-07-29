'use client';

import Link from 'next/link';
import WishlistShare from './WishlistShare';
import WishlistMoveToCart from './WishlistMoveToCart';

export default function WishlistActions({
  totalItems,
  items,
  onMoveAll,
  loading
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-2xl font-bold">My Wishlist</h1>

        <p className="text-gray-500">{totalItems} item(s) saved</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:flex lg:items-center">
        <WishlistShare items={items} />

        <WishlistMoveToCart
          onMoveAll={onMoveAll}
          loading={!totalItems}
        />

        <Link
          href="/products"
          className="bg-primary rounded-lg px-3 py-2 text-center text-xs text-white transition-all duration-200 hover:opacity-90 active:scale-95 sm:px-4 sm:text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
