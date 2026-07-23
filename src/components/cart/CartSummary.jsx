'use client';

import Link from 'next/link';
import { useState } from 'react';
import CouponForm from './CouponForm';

export default function CartSummary({ subtotal }) {
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(false);

  const shipping = subtotal >= 2000 ? 0 : 250;
  const total = Math.round(subtotal + shipping - discount);

  return (
    <div className="h-fit rounded-xl border p-6">
      <h2 className="mb-6 text-xl font-bold">Order Summary</h2>

      <div className="mb-3 flex justify-between">
        <span>Subtotal</span>

        <span>Rs. {subtotal}</span>
      </div>

      <div className="mb-3 flex justify-between">
        <span>Shipping</span>

        <span>{shipping === 0 ? 'Free' : `Rs. ${shipping}`}</span>
      </div>

      {discount > 0 && (
        <div className="mb-3 flex justify-between text-green-600">
          <span>Discount</span>

          <span>-Rs. {Math.round(discount)}</span>
        </div>
      )}

      <div className="my-4 border-t" />

      <div className="mb-6 flex justify-between text-lg font-bold">
        <span>Total</span>

        <span>Rs. {total}</span>
      </div>

      <CouponForm
        subtotal={subtotal}
        setDiscount={setDiscount}
        setCoupon={setCoupon}
        loading={loading}
        setLoading={setLoading}
      />

      {coupon && (
        <p className="mt-3 text-sm text-green-600">
          Applied Coupon: {coupon}
        </p>
      )}

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
