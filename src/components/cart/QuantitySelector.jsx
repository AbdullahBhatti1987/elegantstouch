'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center rounded-lg border">
      {' '}
      <button onClick={onDecrease} className="p-2">
        {' '}
        <Minus size={16} />{' '}
      </button>
      <span className="min-w-12 text-center">{quantity}</span>
      <button onClick={onIncrease} className="p-2">
        <Plus size={16} />
      </button>
    </div>
  );
}
