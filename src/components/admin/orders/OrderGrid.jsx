'use client';

import OrderCard from './OrderCard';

export default function OrderGrid({
  orders,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {orders.map((order) => (
        <OrderCard
          key={order.id}

          order={order}

          onView={onView}

          onEdit={onEdit}

          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
