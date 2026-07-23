'use client';

import Link from 'next/link';
import CouponInput from './CouponInput';
import { useCart } from '@/context/CartContext';

export default function CartSummary({ subtotal }) {
  const { coupon, setCoupon, discount, setDiscount } = useCart();
  
  const shipping = subtotal >= 2000 ? 0 : 250;
  const total = Math.round(subtotal + shipping - discount);

  return (
    <div className="h-fit rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold tracking-tight">
        Order Summary
      </h2>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>

          <span className="font-medium">Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Delivery</span>

          <span className="font-medium">
            {shipping === 0 ? 'Free' : `Rs. ${shipping}`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600">Discount</span>

            <span className="font-medium">
              - Rs. {Math.round(discount)}
            </span>
          </div>
        )}
      </div>

      <div className="my-6 border-t" />

      <div className="mb-6 flex justify-between text-lg font-semibold">
        <span>Total</span>

        <span>Rs. {total}</span>
      </div>
      <div className="mb-6 text-xs">
        <span>Taxes and shipping calculated at checkout</span>

        {/* <span>Rs. {total}</span> */}
      </div>

      <CouponInput
        subtotal={subtotal}
        setDiscount={setDiscount}
        setCoupon={setCoupon}
      />

      {coupon && (
        <p className="mt-3 text-sm">
          Applied Coupon:
          <span className="ml-1 font-medium">{coupon}</span>
        </p>
      )}
      <div className="mt-3 border-t">
        <Link
          href={`/checkout`}
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
        >
          Proceed to Checkout
        </Link>
      </div>
      <Link
        href="/products"
        className="mt-4 block text-center text-sm font-medium underline-offset-4 hover:underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
