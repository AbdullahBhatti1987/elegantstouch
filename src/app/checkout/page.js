'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Checkbox from '@/components/admin/common/form/Checkbox';
import CustomDropdown from '@/components/admin/common/form/CustomDropdown';
import Input from '@/components/admin/common/form/Input';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, guestId, clearCart, coupon, discount } = useCart();
  const [saveInfo, setSaveInfo] = useState(false);
  const [payment, setPayment] = useState('cod');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    landmark: '',
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
      const errors = [];

      if (!form.firstName) {
        errors.push('First Name is required');
      }

      if (!form.lastName) {
        errors.push('Last Name is required');
      }

      if (!form.mobile) {
        errors.push('Mobile Number is required');
      } else if (!/^03\d{9}$/.test(form.mobile)) {
        errors.push('Please enter a valid Pakistani mobile number');
      }

      if (!form.address) {
        errors.push('Complete Address is required');
      }

      if (!form.landmark) {
        errors.push('Nearest Landmark is required');
      }

      if (!form.city) {
        errors.push('City is required');
      }

      if (!form.province) {
        errors.push('Province is required');
      }

      if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
        errors.push('Please enter a valid email address');
      }

      // Show all errors together
      if (errors.length > 0) {
        errors.forEach((error) => {
          toast.error(error);
        });

        return;
      }

      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        guestId,
        items,
        shippingAddress: form,
        saveInfo,
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
    } finally {
      setLoading(false);
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
              <Input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                loading={loading}
                required
                className="rounded-lg border border-gray-400 p-3"
              />

              <Input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                loading={loading}
                required
                className="rounded-lg border border-gray-400 p-3"
              />
            </div>
            <div className="mb-4 grid gap-4 md:grid-cols-2">
              <Input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                loading={loading}
                className="rounded-lg border border-gray-400 p-3"
              />
              <Input
                name="mobile"
                placeholder="Mobile Number"
                value={form.mobile}
                onChange={handleChange}
                loading={loading}
                required
                className="rounded-lg border border-gray-400 p-3"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                loading={loading}
                required
                placeholder="Complete Address"
              />

              <Input
                name="landmark"
                value={form.landmark}
                onChange={handleChange}
                loading={loading}
                placeholder="Nearest Landmark"
              />
            </div>
            <div className="mt-2 grid items-center gap-4 md:grid-cols-2">
              <Input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                loading={loading}
                required
                className="mt-2 rounded-lg border border-gray-400 p-3"
              />
              <CustomDropdown
                name="Province"
                value={form.province}
                loading={loading}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    province: e.target.value,
                  }))
                }
                options={[
                  {
                    value: '',
                    label: 'Select Province',
                  },
                  ...provinces.map((p) => ({
                    value: p,
                    label: p,
                  })),
                ]}
              />

              <Input
                name="postalCode"
                placeholder="Postal Code"
                value={form.postalCode}
                onChange={handleChange}
                loading={loading}
                className="mt-2 w-full rounded-lg border border-gray-400 p-3"
              />
            </div>
            <div className="mt-4">
              <Checkbox
                label="Save this information for next time"
                name="saveInfo"
                checked={saveInfo}
                loading={loading}
                onChange={(e) => setSaveInfo(e.target.checked)}
              />
            </div>
          </section>

          <section className="rounded-xl border p-6">
            <h2 className="mb-4 text-xl font-semibold">Payment</h2>

            <p className="mb-5 text-sm text-gray-500">
              All transactions are secure and encrypted.
            </p>

            <div className="space-y-4">
              {/* Bank Transfer / Easypaisa */}

              <label
                className={`block cursor-pointer rounded-xl border p-4 ${
                  payment === 'bank' ? 'border-black' : ''
                }`}
              >
                <div className="flex gap-3">
                  <input
                    type="radio"
                    checked={payment === 'bank'}
                    onChange={() => setPayment('bank')}
                  />

                  <div>
                    <h3 className="font-semibold">
                      Pay via Bank Transfer (IBFT) / Easypaisa
                    </h3>

                    <p className="mt-2 text-sm text-green-600">
                      🎉 Pay online and get discount instantly.
                    </p>
                  </div>
                </div>

                {payment === 'bank' && (
                  <div className="mt-5 rounded-lg bg-gray-50 p-4 text-sm">
                    <div>
                      <h4 className="mb-3 font-semibold">
                        Bank Transfer Details
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <p>
                            Account Title:
                            <span className="ml-2 font-medium">
                              ABDULLAH BHATTI
                            </span>
                          </p>

                          <p>
                            Account Number:
                            <span className="ml-2 font-medium">
                              03122255770
                            </span>
                          </p>

                          <p>
                            IBAN:
                            <span className="ml-2 font-medium">
                              PK22TMFB0000000040581443
                            </span>
                          </p>

                          <p>
                            Bank:
                            <span className="ml-2 font-medium">
                              TELENOR FINANCE BANK
                            </span>
                          </p>
                        </div>
                        <div className="">
                          <Image
                            src="/images/qrcode.jpeg"
                            alt="QR Code"
                            width={300}
                            height={300}
                            className="h-40 w-auto"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <h4 className="mb-3 font-semibold">Easypaisa</h4>

                    <p>
                      Account Name:
                      <span className="ml-2 font-medium">
                        ABDULLAH BHATTI
                      </span>
                    </p>

                    <p>
                      Mobile Number:
                      <span className="ml-2 font-medium">
                        03122255770
                      </span>
                    </p>

                    <div className="mt-4 rounded-lg bg-white p-3 text-xs text-gray-600">
                      <p>1- Make payment directly to our account.</p>

                      <p>
                        2- Use your order number as payment reference.
                      </p>

                      <p>
                        3- Send payment receipt with order number on
                        WhatsApp.
                      </p>

                      <p>
                        4- Order will be processed after payment
                        confirmation.
                      </p>
                    </div>
                  </div>
                )}
              </label>

              {/* COD */}

              <label
                className={`block cursor-pointer rounded-xl border p-4 ${
                  payment === 'cod' ? 'border-black' : ''
                }`}
              >
                <div className="flex gap-3">
                  <input
                    type="radio"
                    checked={payment === 'cod'}
                    onChange={() => setPayment('cod')}
                  />

                  <div>
                    <h3 className="font-semibold">
                      Cash on Delivery (COD)
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Pay when your order is delivered.
                    </p>
                  </div>
                </div>
              </label>
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
                <div className="flex flex-1 flex-col justify-between">
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
                    <p className="-mt-1 text-sm text-gray-500">
                      Original Price
                    </p>

                    <p className="-mt-1 text-sm text-red-500 line-through">
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
