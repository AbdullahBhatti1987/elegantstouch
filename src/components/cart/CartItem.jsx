'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import QuantitySelector from './QuantitySelector';

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="relative rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {/* REMOVE BUTTON */}

      <button
        onClick={onRemove}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-red-50 dark:hover:bg-red-950"
      >
        <X size={20} strokeWidth={2} />
      </button>

      <div className="flex gap-3 sm:gap-5">
        {/* IMAGE */}

        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
          <Image
            src={item.image}
            alt={item.name}
            fill
            loading='eager'
            sizes="(max-width:640px) 80px, 112px"
            className="object-cover"
          />
        </div>

        {/* CONTENT */}

        <div className="flex min-w-0 flex-1 flex-col justify-between pr-10">
          <div>
            {/* CATEGORY */}

            {/* NAME */}
            <div className="mt-1 flex items-center gap-3">
              <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                {item.name}
              </h3>
              <p className="text-[11px] tracking-wide text-gray-400 uppercase">
                {item.category}
              </p>
            </div>
            {/* PRICE */}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-pink-600 sm:text-base">
                Rs. {item.price}
              </span>

              {item.originalPrice > item.price && (
                <span className="text-xs text-gray-500 line-through sm:text-sm">
                  Rs. {item.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between">
            {/* QUANTITY */}

            <div className="mt-4">
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            </div>

            <div className="absolute right-4 bottom-3 sm:right-5 sm:bottom-4">
              <p className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                Rs. {item.price * item.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
