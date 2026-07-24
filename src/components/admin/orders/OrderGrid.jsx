'use client';

import OrderCard from './OrderCard';

export default function OrderGrid({
  orders,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {orders.map((order) => (
        <OrderCard
          key={order._id}
          order={order}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
