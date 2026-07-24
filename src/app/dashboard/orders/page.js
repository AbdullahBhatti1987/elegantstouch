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

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { loading, startLoading, stopLoading } = useLoading();
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
        />
      ) : (
        <OrderTable
          orders={orders}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
