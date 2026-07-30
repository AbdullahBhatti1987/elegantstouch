'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, ShoppingBag, Printer } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import SpinnerLoader from '@/components/layout/SpinnerLoader';

export default function OrderSuccessPage({ params }) {
  const [order, setOrder] = useState(null);

  const fetchOrder = async () => {
    try {
      const { id } = await params;

      const { data } = await axios.get(`/api/orders/${id}`);
      console.log('ORDER API DATA:', data);
      if (data.success) {
        setOrder(data.data);
      }
    } catch (error) {
      console.error('Order Fetch Error:', error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handlePrint = () => {
    // const invoiceDate = new Date()
    //   .toLocaleString('en-PK', {
    //     dateStyle: 'medium',
    //     timeStyle: 'medium',
    //   })
    //   .replace(/[/:, ]/g, '-');
    // const invoiceDate = new Date()
    //   .toISOString()
    //   .replace(/[:.]/g, '-');
    const invoice = document.getElementById('invoice');

    const printWindow = window.open('', '', 'width=900,height=700');

    const styles = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((style) => style.outerHTML)
      .join('');

    printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
<title>
  ElegantTouch-Invoice
</title>
${styles}

<style>
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            background: white !important;
          }

          #invoice {
            max-width: 800px;
            margin: auto;
          }

          img {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        </style>

      </head>

      <body>

        ${invoice.outerHTML}

      </body>

    </html>
  `);

    printWindow.document.close();

    printWindow.onload = () => {
      printWindow.focus();

      printWindow.print();

      printWindow.close();
    };
  };

  if (!order) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-4 py-10 print:bg-white">
      {/* Invoice */}

      <div
        id="invoice"
        className="mx-auto w-full max-w-[800px] rounded-2xl bg-white p-8 shadow-md print:max-w-full print:rounded-none print:p-0 print:shadow-none"
      >
        {/* Header */}

        <div className="flex items-start justify-between border-b pb-6">
          <div>
            <h1 className="text-3xl font-bold">ElegantTouch</h1>

            <p className="mt-1 text-sm text-gray-500">
              Hair & Jewellery Accessories
            </p>
          </div>

          <div className="text-right">
            <CheckCircle
              size={55}
              className="ml-auto text-green-500"
            />

            <p className="mt-2 font-bold text-green-600">
              Order Confirmed
            </p>
          </div>
        </div>

        {/* Order Info */}

        <div className="mt-6 grid gap-4 rounded-xl bg-gray-50 p-5 md:grid-cols-2 print:border print:bg-white">
          <div>
            <p className="text-sm text-gray-500">Order Number</p>

            <p className="font-bold">
              {order?.orderNumber || order?._id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Payment</p>

            <p className="font-bold uppercase">
              {order.paymentMethod}
            </p>
          </div>
        </div>

        {/* Customer */}

        <section className="mt-6">
          <h2 className="mb-3 text-xl font-bold">
            Customer Information
          </h2>

          <div className="rounded-xl border p-5 text-sm">
            <p>
              <b>Name:</b> {order.shippingAddress?.firstName}{' '}
              {order.shippingAddress.lastName}
            </p>

            <p>
              <b>Mobile:</b> {order.shippingAddress.mobile}
            </p>

            <p>
              <b>Address:</b> {order.shippingAddress.address}
            </p>

            <p>
              <b>City:</b> {order.shippingAddress.city},{' '}
              {order.shippingAddress.province}
            </p>
          </div>
        </section>

        {/* Products Table */}

        <section className="mt-6">
          <h2 className="mb-3 text-xl font-bold">
            Purchased Products
          </h2>

          <div className="overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 print:bg-white">
                <tr>
                  <th className="p-3 text-left">Product</th>

                  <th className="p-3">Qty</th>

                  <th className="p-3">Price</th>

                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item) => (
                  <tr key={item._id} className="border-t">
                    <td className="flex items-center gap-3 p-3">
                      <Image
                        src={item.image || '/images/placeholder.jpg'}
                        width={56}
                        height={56}
                        alt={item.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                      <span className="font-medium">{item.name}</span>
                    </td>

                    <td className="text-center">{item.quantity}</td>

                    <td className="text-center">Rs {item.price}</td>

                    <td className="p-3 text-right font-semibold">
                      Rs {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Total */}

        <div className="mt-6 flex justify-end">
          <div className="w-full max-w-xs space-y-3 rounded-xl border p-5">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <b>Rs {order.subtotal}</b>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <b>Rs {order.shipping}</b>
            </div>

            <div className="flex justify-between border-t pt-3 text-lg">
              <span>Total</span>

              <b>Rs {order.total}</b>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Thank you for shopping with ElegantTouch
        </p>
      </div>

      {/* Actions */}

      <div className="mx-auto mt-6 flex max-w-[800px] gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-black py-3 text-white"
        >
          <Printer size={18} />
          Print / Save PDF
        </button>

        <Link
          href="/products"
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border bg-white py-3 font-semibold"
        >
          <ShoppingBag size={18} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
