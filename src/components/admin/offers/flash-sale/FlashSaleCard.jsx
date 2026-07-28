'use client';

import Image from 'next/image';
import Link from 'next/link';

import { CalendarDays, Package, Pencil } from 'lucide-react';

export default function FlashSaleCard({ sale }) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900">
      {/* Product Preview */}

      <div className="grid grid-cols-3 gap-1 bg-neutral-100 p-2 dark:bg-neutral-800">
        {sale.products?.slice(0, 3).map((product) => (
          <div
            key={product._id}
            className="relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={
                product.images?.[0]?.thumbnail ||
                product.images?.[0]?.url ||
                '/images/placeholder.png'
              }
              alt={product.name}
              fill
              sizes="100px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between">
          <h3 className="line-clamp-1 font-semibold text-neutral-900 dark:text-white">
            {sale.title}
          </h3>

          <span
            className={`rounded-full px-2 py-1 text-xs font-medium ${
              sale.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            } `}
          >
            {sale.status}
          </span>
        </div>

        <p className="line-clamp-2 text-sm text-gray-500">
          {sale.description || 'No description'}
        </p>

        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Package size={16} />
            {sale.products?.length || 0} Products
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays size={16} />
            {new Date(sale.endTime).toLocaleDateString()}
          </div>
        </div>

        <Link
          href={`/dashboard/offers/flash-sale/update/${sale._id}`}

          className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 py-2 text-sm font-semibold text-white dark:bg-white dark:text-black"
        >
          <Pencil size={15} />
          Edit
        </Link>
      </div>
    </div>
  );
}
