'use client';

import Image from 'next/image';
import { Edit, Trash2 } from 'lucide-react';

export default function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
      <table className="w-full table-fixed text-sm">
        <thead className="border-b bg-gray-50 dark:bg-gray-800">
          <tr className="h-14">
            <th className="w-[80px] p-4 text-left">Image</th>

            <th className="w-[30%] p-4 text-left">Name</th>

            <th className="p-4 text-left">Category</th>

            <th className="p-4 text-left">Price</th>

            <th className="p-4 text-left">Stock</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="h-14 border-b hover:bg-gray-50">
              <td className="p-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>

              <td className="truncate p-4 font-medium">{product.name}</td>

              <td className="p-4">{product.category}</td>

              <td className="p-4">
                {product.salePrice || product.price}
                {product.currency}
              </td>

              <td className="p-4">{product.stock}</td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    product.inStock
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  } `}
                >
                  {product.inStock ? 'Active' : 'Out'}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    className="rounded p-2 hover:bg-gray-100"
                  >
                    <Edit size={17} />
                  </button>

                  <button
                    onClick={() => onDelete(product.id)}
                    className="rounded p-2 text-red-600 hover:bg-red-100"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
