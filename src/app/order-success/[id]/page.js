import Link from 'next/link';
import { CheckCircle, ShoppingBag } from 'lucide-react';

export default function OrderSuccessPage({ params }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm">
        <div className="mb-5 flex justify-center">
          <CheckCircle size={70} className="text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Order Placed Successfully
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with ElegantTouch
        </p>

        <div className="my-6 rounded-xl bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Order ID</p>

          <p className="mt-1 font-semibold text-gray-900">
            #{params.id}
          </p>
        </div>

        <Link
          href="/products"

          className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>

        <Link
          href="/"

          className="mt-4 block text-sm text-gray-500 hover:text-black"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
