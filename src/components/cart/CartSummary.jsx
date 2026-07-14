'use client';

import Link from 'next/link';
import CouponForm from './CouponForm';

export default function CartSummary({ subtotal }) {
  const shipping = subtotal > 0 ? 250 : 0;

  const total = subtotal + shipping;

  return (
    <div className="h-fit rounded-xl border p-6">
      {' '}
      <h2 className="mb-6 text-xl font-bold">Order Summary </h2>
      <div className="mb-3 flex justify-between">
        <span>Subtotal</span>
        <span>Rs. {subtotal}</span>
      </div>
      <div className="mb-3 flex justify-between">
        <span>Shipping</span>
        <span>Rs. {shipping}</span>
      </div>
      <div className="my-4 border-t" />
      <div className="mb-6 flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>Rs. {total}</span>
      </div>
      <CouponForm />
      <button className="bg-primary mt-4 w-full rounded-lg py-3 text-white">
        Proceed to Checkout
      </button>
      <Link
        href="/products"
        className="mt-4 block text-center text-sm"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
