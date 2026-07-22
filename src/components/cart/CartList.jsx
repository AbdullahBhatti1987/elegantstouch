'use client';

import CartItem from './CartItem';

export default function CartList({
  items,
  updateQuantity,
  removeItem,
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => updateQuantity(item.id, 'increase')}
          onDecrease={() => updateQuantity(item.id, 'decrease')}
          onRemove={() => removeItem(item.id)}
        />
      ))}
    </div>
  );
}
