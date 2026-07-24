'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import OrderGrid from '@/components/admin/orders/OrderGrid';
import OrderTable from '@/components/admin/orders/OrderTable';
import OrderGridSkeleton from '@/components/admin/common/skeleton/OrderGridSkeleton';
import OrderTableSkeleton from '@/components/admin/common/skeleton/OrderTableSkeleton';
import { useLoading } from '@/context/LoadingContext';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/admin/common/ConfirmModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('orderView') || 'grid';
    }

    return 'grid';
  });

  useEffect(() => {
    localStorage.setItem('orderView', view);
  }, [view]);

  const fetchOrders = async () => {
    try {
      startLoading();

      const res = await axios.get('/api/orders');

      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || 'Failed to load orders',
      );
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onEdit = (order) => {
    router.push(`/dashboard/orders/${order._id}/update`);
  };
  const onView = (order) => {
    router.push(`/dashboard/orders/${order._id}`);
  };

  const onDelete = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const deleteOrder = async () => {
    if (!selectedOrder) return;

    try {
      startLoading();
      const { data } = await axios.delete(
        `/api/orders/${selectedOrder._id}`,
      );

      if (data.success) {
        toast.success('Order deleted successfully');
        setShowDeleteModal(false);
        setSelectedOrder(null);
        fetchOrders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Orders"
        description="Manage your store orders"
        searchPlaceholder="Search orders..."
        view={view}
        setView={setView}
      />

      {loading ? (
        view === 'grid' ? (
          <OrderGridSkeleton />
        ) : (
          <OrderTableSkeleton />
        )
      ) : view === 'grid' ? (
        <OrderGrid
          orders={orders}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ) : (
        <OrderTable
          orders={orders}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      )}

      <ConfirmModal
        open={showDeleteModal}
        title="Delete Order"
        message="This order will be permanently deleted."
        requireText={selectedOrder?.orderNumber || selectedOrder?._id}
        placeholder="Type order number"
        confirmText="Delete Order"
        loading={loading}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedOrder(null);
        }}

        onConfirm={deleteOrder}
      />
    </div>
  );
}
