'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  pagination = {},
  onPageChange,
}) {
  const {
    page = 1,
    totalPages = 1,
    total = 0,
    limit = 8,
  } = pagination;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-6 flex flex-col gap-4 rounded-xl border bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-900">
      {/* Information */}

      <p className=" flex justify-between items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">
          {total === 0 ? 0 : (page - 1) * limit + 1}
        </span>
        {' - '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {Math.min(page * limit, total)}
        </span>
        {' of '}
        <span className="font-semibold text-gray-900 dark:text-white">
          {total}
        </span>
        {' items'}
      </p>

      {/* Pagination Buttons */}

      <div className="flex items-center gap-1">
        <button
          disabled={page === 1 || pages.length === 0}
          onClick={() => onPageChange(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-800"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((item) => (
          <button
            key={item}

            onClick={() => onPageChange(item)}

            className={`h-9 min-w-9 rounded-lg border px-3 text-sm ${
              item === page
                ? 'bg-black text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {item}
          </button>
        ))}

        <button
          disabled={
            page === totalPages || pages.length === 0 || total === 0
          }

          onClick={() => onPageChange(page + 1)}

          className="flex h-9 w-9 items-center justify-center rounded-lg border hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-gray-800"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
