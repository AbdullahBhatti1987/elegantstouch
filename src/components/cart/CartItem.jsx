'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="flex gap-4 rounded-xl border p-4">
      {' '}
      <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
        {' '}
        <Image
          src={item.image}
          alt={item.name}
          fill priority
          className="object-cover"
        />{' '}
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="font-semibold">{item.name}</h3>

          <p className="text-primary mt-1 font-medium">
            Rs. {item.price}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

          <button onClick={onRemove} className="text-red-500">
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="font-semibold">
        Rs. {item.price * item.quantity}
      </div>
    </div>
  );
}
