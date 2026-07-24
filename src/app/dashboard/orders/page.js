'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import OrderGrid from '@/components/admin/orders/OrderGrid';
import OrderTable from '@/components/admin/orders/OrderTable';

export default function OrdersPage() {
  const [view, setView] = useState('grid');

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const onView = (order) => {
    console.log('View Order:', order);
  };

  const onEdit = (order) => {
    console.log('Edit Order:', order);
  };

  const onDelete = (id) => {
    console.log('Delete Order:', id);
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
        <div>Loading...</div>
      ) : view === 'grid' ? (
        <OrderGrid
          orders={orders}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <OrderTable
          orders={orders}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
