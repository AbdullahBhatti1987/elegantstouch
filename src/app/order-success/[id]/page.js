'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function OrderSuccessPage({ params }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { id } = await params; // ✅ Next 16 fix

      const { data } = await axios.get(`/api/orders/${id}`);

      if (data.success) {
        setOrder(data.data);
      }
    };

    fetchOrder();
  }, [params]);

  if (!order) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border bg-white p-8 shadow-sm">
        <div className="mb-5 flex justify-center">
          <CheckCircle size={70} className="text-green-500" />
        </div>

        <h1 className="text-center text-3xl font-bold">
          Order Placed Successfully
        </h1>

        <p className="mt-3 text-center text-gray-600">
          Thank you for shopping with ElegantTouch
        </p>

        <div className="mt-6 space-y-3 rounded-xl bg-gray-50 p-5">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>

            <p className="font-semibold">#{order._id}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Customer Name</p>

            <p className="font-semibold">
              {order.shippingAddress.firstName}{' '}
              {order.shippingAddress.lastName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mobile</p>

            <p className="font-semibold">
              {order.shippingAddress.mobile}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Delivery Address</p>

            <p className="font-semibold">
              {order.shippingAddress.address}
              <br />
              {order.shippingAddress.city},
              {order.shippingAddress.province}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Payment Method</p>

            <p className="font-semibold uppercase">
              {order.paymentMethod}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Total Amount</p>

            <p className="text-xl font-bold">Rs {order.total}</p>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="mt-5 w-full rounded-xl border py-3 font-semibold"
        >
          Save / Print Order Details
        </button>

        <Link
          href="/products"
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
