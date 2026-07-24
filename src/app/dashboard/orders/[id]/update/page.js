'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';

export default function OrderEditPage() {
  const params = useParams();
  const id = params.id;

  const { loading, startLoading, stopLoading } = useLoading();

  const [updating, setUpdating] = useState(false);

  const [order, setOrder] = useState(null);

  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  async function getOrder() {
    try {
      startLoading();

      const { data } = await axios.get(`/api/orders/${id}`);

      if (data.success) {
        setOrder(data.data);

        setOrderStatus(data.data.orderStatus);

        setPaymentStatus(data.data.paymentStatus);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Order not found');
    } finally {
      stopLoading();
    }
  }

  useEffect(() => {
    if (id) {
      getOrder();
    }
  }, [id]);

  // UPDATE ORDER STATUS + PAYMENT

  async function updateOrderStatus() {
    try {
      setUpdating(true);

      const { data } = await axios.patch(`/api/orders/${id}`, {
        orderStatus,
        paymentStatus,
      });

      if (data.success) {
        toast.success('Order updated successfully');

        setOrder(data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setUpdating(false);
    }
  }

  // UPDATE SINGLE PRODUCT STATUS

  async function updateItemStatus(itemId, itemStatus) {
    try {
      const { data } = await axios.patch(`/api/orders/${id}`, {
        itemId,
        itemStatus,
      });

      if (data.success) {
        toast.success('Product status updated');

        setOrder(data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Item update failed',
      );
    }
  }

  if (loading) {
    return <div className="p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Update Order</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT SIDE */}

        <div className="space-y-6 lg:col-span-2">
          {/* ORDER INFO */}

          <div className="rounded-xl border bg-white p-5">
            <h2 className="mb-4 font-semibold">Order Information</h2>

            <div className="grid gap-3 md:grid-cols-2">
             
              <p>
                <b>Order Number:</b>
                <br />
                {order.orderNumber}
              </p>

              <p>
                <b>Payment Method:</b>
                <br />
                {order.paymentMethod}
              </p>
            </div>
          </div>

          {/* CUSTOMER */}

          <div className="rounded-xl border bg-white p-5">
            <h2 className="mb-4 font-semibold">Customer Details</h2>

            <div className="grid gap-4 md:grid-cols-2">
              <p>
                <b>Name</b>
                <br />
                {order.shippingAddress?.firstName}{' '}
                {order.shippingAddress?.lastName}
              </p>

              <p>
                <b>Email</b>
                <br />
                {order.shippingAddress?.email || '-'}
              </p>

              <p>
                <b>Mobile</b>
                <br />
                {order.shippingAddress?.mobile}
              </p>

              <p>
                <b>City</b>
                <br />
                {order.shippingAddress?.city}
              </p>

              <p>
                <b>Address</b>
                <br />
                {order.shippingAddress?.address}
              </p>

              <p>
                <b>Province</b>
                <br />
                {order.shippingAddress?.province}
              </p>
            </div>
          </div>

          {/* PRODUCTS */}

          <div className="rounded-xl border bg-white p-5">
            <h2 className="mb-4 font-semibold">Products</h2>

            <div className="space-y-4">
              {order.items?.map((item) => (
                <div key={item._id} className="rounded-lg border p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    <p>
                      <b>Name</b>
                      <br />
                      {item.name}
                    </p>

                    <p>
                      <b>Product ID</b>
                      <br />
                      {item.productId}
                    </p>

                    <p>
                      <b>Price</b>
                      <br />
                      {item.price}
                    </p>

                    <p>
                      <b>Quantity</b>
                      <br />
                      {item.quantity}
                    </p>
                  </div>

                  <label className="mt-4 block text-sm font-medium">
                    Product Status
                  </label>

                  <select
                    value={item.itemStatus}

                    onChange={(e) =>
                      updateItemStatus(item._id, e.target.value)
                    }

                    className="mt-2 w-full rounded-lg border px-3 py-2"
                  >
                    <option value="pending">Pending</option>

                    <option value="confirmed">Confirmed</option>

                    <option value="shipped">Shipped</option>

                    <option value="delivered">Delivered</option>

                    <option value="cancelled">Cancelled</option>

                    <option value="returned">Returned</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="space-y-6">
          {/* SUMMARY */}

          <div className="rounded-xl border bg-white p-5">
            <h2 className="mb-4 font-semibold">Order Summary</h2>

            <div className="space-y-2 text-sm">
              <p>
                <b>Subtotal:</b> {order.subtotal}
              </p>

              <p>
                <b>Shipping:</b> {order.shipping}
              </p>

              <p>
                <b>Discount:</b> {order.discount}
              </p>

              <p>
                <b>Total:</b> {order.total}
              </p>
            </div>
          </div>

          {/* STATUS */}

          <div className="rounded-xl border bg-white p-5 lg:sticky lg:top-20">
            <h2 className="mb-4 font-semibold">Update Status</h2>

            <label className="mb-2 block">Order Status</label>

            <select
              value={orderStatus}

              onChange={(e) => setOrderStatus(e.target.value)}

              className="mb-4 w-full rounded-lg border px-3 py-2"
            >
              <option value="pending">Pending</option>

              <option value="confirmed">Confirmed</option>

              <option value="shipped">Shipped</option>

              <option value="delivered">Delivered</option>

              <option value="cancelled">Cancelled</option>

              <option value="returned">Returned</option>
            </select>

            <label className="mb-2 block">Payment Status</label>

            <select
              value={paymentStatus}

              onChange={(e) => setPaymentStatus(e.target.value)}

              className="mb-4 w-full rounded-lg border px-3 py-2"
            >
              <option value="pending">Pending</option>

              <option value="paid">Paid</option>

              <option value="failed">Failed</option>

              <option value="refunded">Refunded</option>
            </select>

            <button
              onClick={updateOrderStatus}

              disabled={updating}

              className="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"
            >
              {updating ? 'Updating...' : 'Update Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
