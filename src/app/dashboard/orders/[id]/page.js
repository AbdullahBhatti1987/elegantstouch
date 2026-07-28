'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import {
  MapPin,
  CreditCard,
  Package,
  CalendarDays,
  Truck,
  User,
} from 'lucide-react';
import { Info } from '@/components/admin/common/form/Info';

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
    if (id) getOrder();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;

  if (!order) return <div className="p-4">Order not found</div>;

  const DetailRow = ({ label, value }) => (
    <div className="flex items-center justify-between border-b py-2 last:border-none">
      <span className="text-sm text-gray-500">{label}</span>

      <span className="text-sm font-semibold text-gray-900 dark:text-white">
        {value || '-'}
      </span>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-5 p-4">
      {/* HEADER */}

      <div className="flex items-center justify-between rounded-xl border bg-white p-4 dark:bg-gray-900">
        <div>
          <h1 className="text-xl font-bold">Order Details</h1>

          <p className="text-sm text-gray-500">
            #{order.orderNumber}
          </p>
        </div>

        <div className="text-right">
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
            {order.orderStatus}
          </span>

          <p className="mt-2 text-xs text-gray-500">
            <CalendarDays size={13} className="inline" />{' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-5 lg:col-span-2">
          {/* PRODUCTS */}

          <section className="rounded-xl border bg-white p-4 dark:bg-gray-900">
            <h2 className="mb-3 flex items-center gap-2 font-bold">
              <Package size={18} />
              Products
            </h2>

            <div className="space-y-3">
              {order.items?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image || '/images/placeholder.jpg'}
                      className="h-14 w-14 rounded-lg object-cover"
                    />

                    <div>
                      <h3 className="text-sm font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm font-bold">
                    {item.price} PKR
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CUSTOMER + ADDRESS */}

          <section className="rounded-xl border bg-white p-4 dark:bg-gray-900">
            <h2 className="mb-4 flex items-center gap-2 font-bold">
              <MapPin size={18} />
              Shipping Information
            </h2>

            <div className="grid gap-3 md:grid-cols-2">
              <Info
                label="Customer Name"
                value={`${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`}
              />

              <Info
                label="Mobile"
                value={order.shippingAddress.mobile}
              />

              <Info
                label="Address"
                value={order.shippingAddress.address}
              />

              <Info
                label="Landmark"
                value={order.shippingAddress.landmark}
              />

              <Info
                label="City"
                value={`${order.shippingAddress.city}, ${order.shippingAddress.province}`}
              />

              <Info
                label="Postal Code"
                value={order.shippingAddress.postalCode}
              />
            </div>
          </section>
        </div>

        {/* RIGHT */}

        <section className="rounded-xl border bg-white p-4 dark:bg-gray-900">
          <h2 className="mb-4 flex items-center gap-2 font-bold">
            <CreditCard size={18} />
            Payment
          </h2>

          <div className="space-y-3">
            <Info
              label="Payment Method"
              value={order.paymentMethod}
            />

            <Info
              label="Payment Status"
              value={order.paymentStatus}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
