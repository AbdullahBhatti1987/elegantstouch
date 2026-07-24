'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {
  User,
  MapPin,
  CreditCard,
  Package,
  Truck,
  CalendarDays,
} from 'lucide-react';

export default function OrderViewPage() {
  const params = useParams();

  const id = params.id;

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  async function getOrder() {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);

      if (data.success) {
        setOrder(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Details</h1>

          <p className="text-sm text-gray-500">
            #{order.orderNumber}
          </p>
        </div>

        <div className="text-right">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm">
            {order.orderStatus}
          </span>

          <p className="mt-2 text-sm text-gray-500">
            <CalendarDays size={14} className="inline" />{' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-6 lg:col-span-2">
          {/* PRODUCTS */}

          <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
            <h2 className="mb-4 flex gap-2 font-bold">
              <Package size={18} />
              Products
            </h2>

            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border p-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image || '/images/placeholder.jpg'}
                      className="h-16 w-16 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="font-bold">{item.price} PKR</div>
                </div>
              ))}
            </div>
          </div>

          {/* ADDRESS */}

          <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
            <h2 className="mb-4 flex gap-2 font-bold">
              <MapPin size={18} />
              Shipping Address
            </h2>

            <p>
              {order.shippingAddress.firstName}{' '}
              {order.shippingAddress.lastName}
            </p>

            <p>{order.shippingAddress.mobile}</p>

            <p>{order.shippingAddress.address}</p>

            <p>{order.shippingAddress.landmark}</p>

            <p>
              {order.shippingAddress.city},{' '}
              {order.shippingAddress.province}
            </p>

            <p>{order.shippingAddress.postalCode}</p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">
          {/* PAYMENT */}

          <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
            <h2 className="mb-4 flex gap-2 font-bold">
              <CreditCard size={18} />
              Payment
            </h2>

            <p>
              Method:
              <b className="ml-2">{order.paymentMethod}</b>
            </p>

            <p className="mt-2">
              Status:
              <b className="ml-2">{order.paymentStatus}</b>
            </p>
          </div>

          {/* SUMMARY */}

          <div className="rounded-2xl border bg-white p-5 dark:bg-gray-900">
            <h2 className="mb-4 font-bold">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>

                <b>{order.subtotal} PKR</b>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <b>{order.shipping} PKR</b>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>

                <b>{order.discount} PKR</b>
              </div>

              {order.coupon?.code && (
                <div>
                  Coupon:
                  <b className="ml-2">{order.coupon.code}</b>
                </div>
              )}

              <hr />

              <div className="flex justify-between text-lg">
                <span>Total</span>

                <b>{order.total} PKR</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
