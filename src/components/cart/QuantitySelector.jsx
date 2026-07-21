'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center rounded-full border shadow:lg border-gray-400 bg-gray-50 px-1 py-1 dark:border-zinc-700 dark:bg-zinc-800">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white disabled:opacity-40 dark:hover:bg-zinc-700"
      >
        <Minus size={15} />
      </button>

      <span className="w-10 text-center text-sm font-semibold">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white dark:hover:bg-zinc-700"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
