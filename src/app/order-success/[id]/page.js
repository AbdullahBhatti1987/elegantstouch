// 'use client';

// import { useEffect, useState } from 'react';
// import { CheckCircle, ShoppingBag, Printer } from 'lucide-react';
// import Link from 'next/link';
// import axios from 'axios';

// export default function OrderSuccessPage({ params }) {
//   const [order, setOrder] = useState(null);

//   useEffect(() => {
//     const fetchOrder = async () => {
//       const { id } = await params;

//       const { data } = await axios.get(`/api/orders/${id}`);

//       if (data.success) {
//         setOrder(data.data);
//       }
//     };

//     fetchOrder();
//   }, [params]);

//   if (!order) {
//     return (
//       <div className="flex min-h-[70vh] items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-[80vh] bg-gray-50 px-4 py-10">
//       <div className="mx-auto w-full max-w-3xl">
//         {/* Main Card */}

//         <div className="rounded-3xl bg-white p-6 shadow-sm md:p-10">
//           {/* Success */}

//           <div className="text-center">
//             <CheckCircle
//               size={80}
//               className="mx-auto text-green-500"
//             />

//             <h1 className="mt-5 text-3xl font-bold">
//               Order Placed Successfully
//             </h1>

//             <p className="mt-2 text-gray-500">
//               Thank you for shopping with ElegantTouch
//             </p>
//           </div>

//           {/* Order ID */}

//           <div className="mt-8 rounded-xl bg-gray-100 p-5">
//             <p className="text-sm text-gray-500">Order Number</p>

//             <p className="mt-1 font-bold break-all">
//               #{order.orderNumber || `#${order._id}`}
//             </p>
//           </div>

//           {/* Customer Detail */}

//           <div className="mt-6 rounded-xl border p-5">
//             <h2 className="mb-4 text-xl font-bold">
//               Customer Details
//             </h2>

//             <div className="space-y-2 text-sm">
//               <p>
//                 <span className="text-gray-500">Name:</span>{' '}
//                 <b>
//                   {order.shippingAddress.firstName}{' '}
//                   {order.shippingAddress.lastName}
//                 </b>
//               </p>

//               <p>
//                 <span className="text-gray-500">Mobile:</span>{' '}
//                 <b>{order.shippingAddress.mobile}</b>
//               </p>

//               <p>
//                 <span className="text-gray-500">Address:</span>{' '}
//                 <b>{order.shippingAddress.address}</b>
//               </p>

//               <p>
//                 <span className="text-gray-500">City:</span>{' '}
//                 <b>
//                   {order.shippingAddress.city},{' '}
//                   {order.shippingAddress.province}
//                 </b>
//               </p>
//             </div>
//           </div>

//           {/* Products */}

//           <div className="mt-6 rounded-xl border p-5">
//             <h2 className="mb-5 text-xl font-bold">Your Products</h2>

//             <div className="space-y-4">
//               {order.items?.map((item) => (
//                 <div
//                   key={item._id}
//                   className="flex gap-4 rounded-xl bg-gray-50 p-4"
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="h-24 w-24 rounded-xl border object-cover"
//                   />

//                   <div className="flex-1">
//                     <h3 className="font-semibold">{item.name}</h3>

//                     <p className="mt-1 text-sm text-gray-500">
//                       Quantity: {item.quantity}
//                     </p>

//                     <p className="mt-2 font-bold">Rs {item.price}</p>

//                     <p className="text-sm text-gray-600">
//                       Total:
//                       <b> Rs {item.price * item.quantity}</b>
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Payment Summary */}

//           <div className="mt-6 rounded-xl border p-5">
//             <h2 className="mb-4 text-xl font-bold">
//               Payment Summary
//             </h2>

//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span>Payment Method</span>

//                 <b className="uppercase">{order.paymentMethod}</b>
//               </div>

//               <div className="flex justify-between border-t pt-3">
//                 <span>Total Amount</span>

//                 <b className="text-xl">Rs {order.total}</b>
//               </div>
//             </div>
//           </div>

//           {/* Buttons */}

//           <button
//             onClick={() => window.print()}
//             className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border py-3 font-semibold hover:bg-gray-50"
//           >
//             <Printer size={18} />
//             Save / Print Order
//           </button>

//           <Link
//             href="/products"
//             className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-black py-3 font-semibold text-white hover:bg-gray-800"
//           >
//             <ShoppingBag size={18} />
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

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
              {order.orderNumber || order._id}
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
              <b>Name:</b> {order.shippingAddress.firstName}{' '}
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
                      <img
                        src={item.image}
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
          onClick={() => window.print()}
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

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            background: white;
          }
        }
      `}</style>
    </div>
  );
}
