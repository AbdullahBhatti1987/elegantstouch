'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams } from 'next/navigation';

export default function OrderEditPage() {
  const params = useParams();
  const id = params.id;

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [order, setOrder] = useState(null);

  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  // GET ORDER
  async function getOrder() {
    try {
      const { data } = await axios.get(`/api/orders/${id}`);

      if (data.success) {
        setOrder(data.data);

        setOrderStatus(data.data.orderStatus);

        setPaymentStatus(data.data.paymentStatus);
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

  // UPDATE STATUS
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

  if (loading) {
    return <div className="p-6">Loading order...</div>;
  }

  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Update Order Status</h1>

      <div className="space-y-5 rounded-xl bg-white p-6 shadow">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>

          <p className="font-medium">{order._id}</p>
        </div>

        {/* ORDER STATUS */}

        <div>
          <label className="mb-2 block font-medium">
            Order Status
          </label>

          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="pending">Pending</option>

            <option value="confirmed">Confirmed</option>

            <option value="shipped">Shipped</option>

            <option value="delivered">Delivered</option>

            <option value="cancelled">Cancelled</option>

            <option value="returned">Returned</option>
          </select>
        </div>

        {/* PAYMENT STATUS */}

        <div>
          <label className="mb-2 block font-medium">
            Payment Status
          </label>

          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="w-full rounded-lg border px-3 py-2"
          >
            <option value="pending">Pending</option>

            <option value="paid">Paid</option>

            <option value="failed">Failed</option>

            <option value="refunded">Refunded</option>
          </select>
        </div>

        <button
          onClick={updateOrderStatus}
          disabled={updating}
          className="w-full rounded-lg bg-blue-600 py-2 text-white disabled:opacity-50"
        >
          {updating ? 'Updating...' : 'Update Order'}
        </button>
      </div>
    </div>
  );
}
