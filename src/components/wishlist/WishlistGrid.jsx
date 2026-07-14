'use client';

import WishlistItem from './WishlistItem';

export default function WishlistGrid({
  items,
  onRemove,
  onAddToCart,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <WishlistItem
          key={item.id}
          item={item}
          onRemove={() => onRemove(item.id)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
