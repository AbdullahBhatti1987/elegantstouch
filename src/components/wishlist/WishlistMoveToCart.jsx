'use client';

import { ShoppingCart } from 'lucide-react';

export default function WishlistMoveToCart({
  onMoveAll,
  disabled = false,
}) {
  return (
    <button
      onClick={onMoveAll}
      disabled={disabled}
      className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      <ShoppingCart size={18} />
      Move All To Cart
    </button>
  );
}
