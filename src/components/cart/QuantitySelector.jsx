'use client';

import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="flex items-center rounded-full border border-gray-400 bg-gray-50 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-white disabled:opacity-40 sm:h-8 sm:w-8 dark:hover:bg-zinc-700"
      >
        <Minus size={12} className="sm:size-[15px]" />
      </button>

      <span className="w-7 text-center text-xs font-semibold sm:w-10 sm:text-sm">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-white sm:h-8 sm:w-8 dark:hover:bg-zinc-700"
      >
        <Plus size={12} className="sm:size-[15px]" />
      </button>
    </div>
  );
}
