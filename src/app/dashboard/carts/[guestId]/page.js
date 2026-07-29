'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

import { Info } from '@/components/admin/common/form/Info';
import AdminViewHeader from '@/components/admin/common/header/AdminViewHeader';
import NotFound from '@/components/admin/common/states/NotFound';
import ProductDetailSkeleton from '@/components/admin/common/skeleton/detailSkeletons/ProductDetailSkeleton';

import {
  ShoppingCart,
  Package,
  User,
  CalendarDays,
  Banknote,
} from 'lucide-react';

export default function CartDetailPage() {
  const params = useParams();
  console.log('Params Cart==>', params);
  const guestId = params.guestId;
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getCart() {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/carts/${guestId}`);

      if (data.success) {
        setCart(data.data);
      }
    } catch (error) {
      toast.error('Cart not found');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (guestId) {
      getCart();
    }
  }, [guestId]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!cart) {
    return (
      <NotFound
        title="Cart Not Found"
        message="The cart you are looking for does not exist."
        buttonText="Back to Carts"
      />
    );
  }

  const subtotal =
    cart.items?.reduce(
      (total, item) =>
        total +
        (item.productId?.salePrice || item.productId?.price || 0) *
          item.quantity,
      0,
    ) || 0;

  const deliveryCharges = subtotal >= 2000 ? 0 : 250;

  const totalAmount = subtotal + deliveryCharges;

  return (
    <div className="space-y-6">
      {/* Header */}

      <AdminViewHeader
        title="Cart Details"
        subtitle="Customer Cart Information"
      />

      {/* Main */}

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Customer Summary */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <User size={28} className="text-blue-600" />
            </div>

            <div>
              <h2 className="font-semibold">Customer</h2>

              <p className="text-sm text-gray-500">Guest User</p>
            </div>
          </div>

          <div className="space-y-4">
            <Info label="Guest ID" value={cart.guestId} />

            <Info label="Status" value={cart.status} />

            <Info
              label="Cart Age"
              value={`${cart.cartAge || 0} Days`}
            />
          </div>
        </div>

        {/* Cart Summary */}

        <div className="space-y-5 xl:col-span-2">
          <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">
              Cart Summary
            </h2>

            <div className="grid gap-4 md:grid-cols-3">
              <Info
                label="Products"
                value={cart.items?.length || 0}
              />

              <Info
                label="Quantity"
                value={
                  cart.items?.reduce((a, b) => a + b.quantity, 0) || 0
                }
              />

              <Info
                label="Total Amount"
                value={`${totalAmount} PKR`}
              />
            </div>
          </div>

          {/* Pricing */}

          <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
            <h2 className="mb-5 text-xl font-semibold">
              Price Details
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <Info label="Subtotal" value={`${subtotal} PKR`} />

              <Info
                label="Delivery Charges"
                value={
                  deliveryCharges === 0
                    ? 'Free'
                    : `${deliveryCharges} PKR`
                }
              />

              <Info
                label="Final Amount"
                value={`${totalAmount} PKR`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Cart Products */}

      <div className="rounded-xl border bg-white p-6 dark:bg-zinc-900">
        <h2 className="mb-5 text-xl font-semibold">Cart Items</h2>

        <div className="space-y-4">
          {cart.items?.map((item, index) => (
            <div
              key={`${item.productId?._id}-${index}`}
              className="flex items-center justify-between rounded-xl border p-4 dark:border-gray-800"
            >
              <div>
                <h3 className="font-semibold">
                  {item.productId?.name}
                </h3>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  {item.productId?.salePrice || item.productId?.price}{' '}
                  PKR
                </p>

                <p className="text-sm text-gray-500">
                  Total:{' '}
                  {(item.productId?.salePrice ||
                    item.productId?.price) * item.quantity}{' '}
                  PKR
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
