'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {' '}
      <ShoppingBag size={80} className="text-primary mb-4" />
      <h2 className="mb-2 text-2xl font-bold">Your Cart is Empty</h2>
      <p className="mb-6 text-gray-500">
        Looks like you haven't added any products yet.
      </p>
      <Link
        href="/products"
        className="bg-primary rounded-lg px-6 py-3 text-white"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
