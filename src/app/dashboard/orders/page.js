'use client';

import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import OrderGrid from '@/components/admin/orders/OrderGrid';
import OrderTable from '@/components/admin/orders/OrderTable';
import { orders } from '@/content/data';
import { useState } from 'react';

export default function OrdersPage() {
  const [view, setView] = useState('grid');

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
        // addText="Add Order"
        view={view}
        setView={setView}
        // onAdd={() => console.log('Add Order')}
      />

      {view === 'grid' ? (
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
