"use client";

import Image from "next/image";
import { Edit, Trash2 } from "lucide-react";

export default function CategoryTable({ categories, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl border">
      <table className="w-full text-sm">
        <thead className="border-b bg-gray-50 dark:bg-gray-800">
          <tr className="h-14 w-full">
            <th className="p-4 text-left">Image</th>

            <th className="p-4 text-left">Name</th>

            <th className="p-4 text-left">Slug</th>

            <th className="p-4 text-left">Products</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Featured</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="h-14 border-b hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {/* Image */}
              <td className="p-4">
                <div className="w-12 h-12 relative overflow-hidden rounded-lg">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </td>

              {/* Name */}
              <td className="p-4 whitespace-nowrap font-medium">{category.name}</td>

              {/* Slug */}
              <td className="p-4 whitespace-nowrap text-gray-500">{category.slug}</td>

              {/* Products */}
              <td className="p-4 whitespace-nowrap">{category.productCount || 0}</td>

              {/* Status */}
              <td className="p-4 whitespace-nowrap">
                <span
                  className={`
                  px-3 py-1 rounded-full text-xs
                  ${
                    category.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }
                  `}
                >
                  {category.status}
                </span>
              </td>

              {/* Featured */}
              <td className="p-4 text-center">{category.featured ? " Yes" : "No"}</td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => onEdit(category)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <Edit size={17} />
                  </button>

                  <button
                    onClick={() => onDelete(category._id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
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
