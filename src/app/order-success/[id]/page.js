'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, ShoppingBag, Printer } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function OrderSuccessPage({ params }) {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const { id } = await params;

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
    <div className="min-h-[80vh] bg-gray-50 px-4 py-10">
      <div className="mx-auto w-full max-w-3xl">
        {/* Main Card */}

        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
          {/* Success */}

          <div className="text-center">
            <CheckCircle
              size={80}
              className="mx-auto text-green-500"
            />

            <h1 className="mt-5 text-3xl font-bold">
              Order Placed Successfully
            </h1>

            <p className="mt-2 text-gray-500">
              Thank you for shopping with ElegantTouch
            </p>
          </div>

          {/* Order ID */}

          <div className="mt-8 rounded-xl bg-gray-100 p-5">
            <p className="text-sm text-gray-500">Order ID</p>

            <p className="mt-1 font-bold break-all">#{order._id}</p>
          </div>

          {/* Customer Detail */}

          <div className="mt-6 rounded-xl border p-5">
            <h2 className="mb-4 text-xl font-bold">
              Customer Details
            </h2>

            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-500">Name:</span>{' '}
                <b>
                  {order.shippingAddress.firstName}{' '}
                  {order.shippingAddress.lastName}
                </b>
              </p>

              <p>
                <span className="text-gray-500">Mobile:</span>{' '}
                <b>{order.shippingAddress.mobile}</b>
              </p>

              <p>
                <span className="text-gray-500">Address:</span>{' '}
                <b>{order.shippingAddress.address}</b>
              </p>

              <p>
                <span className="text-gray-500">City:</span>{' '}
                <b>
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.province}
                </b>
              </p>
            </div>
          </div>

          {/* Products */}

          <div className="mt-6 rounded-xl border p-5">
            <h2 className="mb-5 text-xl font-bold">Your Products</h2>

            <div className="space-y-4">
              {order.items?.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-xl bg-gray-50 p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-xl border object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                    <p className="mt-2 font-bold">Rs {item.price}</p>

                    <p className="text-sm text-gray-600">
                      Total:
                      <b> Rs {item.price * item.quantity}</b>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}

          <div className="mt-6 rounded-xl border p-5">
            <h2 className="mb-4 text-xl font-bold">
              Payment Summary
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Payment Method</span>

                <b className="uppercase">{order.paymentMethod}</b>
              </div>

              <div className="flex justify-between border-t pt-3">
                <span>Total Amount</span>

                <b className="text-xl">Rs {order.total}</b>
              </div>
            </div>
          </div>

          {/* Buttons */}

          <button
            onClick={() => window.print()}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold hover:bg-gray-50"
          >
            <Printer size={18} />
            Save / Print Order
          </button>

          <Link
            href="/products"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
