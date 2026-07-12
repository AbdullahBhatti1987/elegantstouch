'use client';

import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white dark:bg-gray-900">
      {/* Image */}

      <div className="relative h-40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}

      <div className="p-4">
        <div className="flex justify-between">
          <h3 className="truncate font-semibold">{product.name}</h3>

          {product.badge && (
            <span className="rounded bg-yellow-100 px-2 py-1 text-xs">
              {product.badge}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {product.categoryId?.name}
        </p>

        <div className="mt-3">
          <span className="font-bold">
            {product.salePrice || product.price}
          </span>

          <span className="ml-1 text-sm">{product.currency}</span>
        </div>

        <div className="mt-2 text-sm">
          Stock:
          <b className="ml-1">{product.stock}</b>
        </div>

        {/* <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="flex flex-1 justify-center gap-2 rounded-lg border py-2"
          >
            <Edit size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete(product.id)}
            className="flex flex-1 justify-center gap-2 rounded-lg bg-red-500 py-2 text-white"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div> */}
      </div>
    </div>
  );
}
