'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, guestId, clearCart, coupon, discount } = useCart();

  const [payment, setPayment] = useState('cod');

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    province: '',
    postalCode: '',
  });

  const items = cart?.items || [];
  console.log('CHECKOUT ITEMS:', items);

  const subtotal = items.reduce(
    (total, item) =>
      total +
      (item.productId.salePrice || item.productId.price) *
        item.quantity,
    0,
  );

  const shipping = subtotal >= 2000 ? 0 : 250;

  const total = Math.round(subtotal + shipping - discount);

  const provinces = [
    'Punjab',
    'Sindh',
    'Khyber Pakhtunkhwa',
    'Balochistan',
    'Islamabad Capital Territory',
    'Gilgit Baltistan',
    'Azad Kashmir',
  ];

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    try {
      if (
        !form.fullName ||
        !form.mobile ||
        !form.address ||
        !form.city ||
        !form.province
      ) {
        toast.error('Please complete shipping information');

        return;
      }

      const { data } = await axios.post('/api/orders', {
        guestId,
        items,
        shippingAddress: form,
        paymentMethod: payment,
        subtotal,
        shipping,
        discount,
        coupon,
        total,
      });

      if (data.success) {
        toast.success('Order placed successfully');

        clearCart();

        router.push(`/order-success/${data.data._id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order failed');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* LEFT */}

        <div className="space-y-6 lg:col-span-2">
          <section className="rounded-xl border p-6">
            <h2 className="mb-5 text-xl font-semibold">
              Shipping Information
            </h2>

            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <input
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="mobile"
                placeholder="03XXXXXXXXX"
                value={form.mobile}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="rounded-lg border p-3"
              />
            </div>

            <textarea
              name="address"

              value={form.address}

              onChange={handleChange}

              placeholder="Complete Address"

              className="mt-4 h-28 w-full rounded-lg border p-3"
            />

            <select
              name="province"

              value={form.province}

              onChange={handleChange}

              className="mt-4 w-full rounded-lg border p-3"
            >
              <option value="">Select Province</option>

              {provinces.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>

            <input
              name="postalCode"

              placeholder="Postal Code"

              value={form.postalCode}

              onChange={handleChange}

              className="mt-4 w-full rounded-lg border p-3"
            />
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 font-semibold">Payment Method</h2>

            <div className="space-y-3">
              {[
                ['cod', 'Cash On Delivery'],
                ['easypaisa', 'Easypaisa'],
                ['jazzcash', 'JazzCash'],
              ].map(([value, label]) => (
                <label key={value} className="flex gap-3">
                  <input
                    type="radio"

                    checked={payment === value}

                    onChange={() => setPayment(value)}
                  />

                  {label}
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT */}

        <div className="h-fit rounded-xl border p-6">
          <h2 className="mb-5 text-xl font-bold">Your Order</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.productId._id}
                className="flex gap-4 rounded-xl border p-3"
              >
                {/* Product Image */}
                <div className="relative aspect-square w-16 flex-shrink-0 overflow-hidden rounded-lg border sm:w-20 md:w-24">
                  <Image
                    src={item.productId?.images?.[0]?.thumbnail}
                    alt={item.productId.name}
                    fill
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    className="object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between gap-4">
                    <p className="text-sm text-gray-500">Product</p>

                    <p className="max-w-[180px] text-right text-sm font-medium">
                      {item.productId.name}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">Quantity</p>

                    <p className="text-sm font-medium">
                      {item.quantity}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      Sale Price
                    </p>

                    <p className="font-bold">
                      Rs. {item.productId.salePrice}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500">
                      Original Price
                    </p>

                    <p className="text-sm text-red-500 line-through">
                      Rs. {item.productId.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-5 border-t" />

          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span className="font-semibold text-gray-600">
                Rs {subtotal}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span className="font-semibold text-gray-600">
                {shipping === 0 ? 'Free' : `Rs ${shipping}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>
                  Coupon Discount
                  {coupon && (
                    <span className="ml-2 text-xs font-semibold">
                      ( {coupon} )
                    </span>
                  )}
                </span>

                <span className="font-semibold">
                  -Rs {Math.round(discount)}
                </span>
              </div>
            )}

            <div className="flex justify-between border-t pt-3 font-bold">
              <span>Total</span>

              <span>Rs {total}</span>
            </div>
          </div>

          <button
            onClick={placeOrder}

            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
          >
            <Lock size={18} />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
