'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScrollPagination({
  pagination = {},
  onPageChange,
}) {
  const {
    page = 1,
    totalPages = 1,
    total = 0,
    limit = 8,
  } = pagination;

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (page > 4) {
      pages.push('...');
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 3) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className="mt-8 flex flex-col gap-4">
      {/* Info */}

      <div className="text-center text-sm text-gray-500">
        Showing{' '}
        <span className="font-semibold">
          {total === 0 ? 0 : (page - 1) * limit + 1}
        </span>
        {' - '}
        <span className="font-semibold">
          {Math.min(page * limit, total)}
        </span>
        {' of '}
        <span className="font-semibold">{total}</span>
        {' items'}
      </div>

      {/* Scrollable Pagination */}

      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex h-10 min-w-10 items-center justify-center rounded-xl border bg-white disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        {pages.map((item, index) =>
          item === '...' ? (
            <span key={index} className="px-2 text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              className={`h-10 min-w-10 rounded-xl border px-3 text-sm transition ${
                item === page
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {item}
            </button>
          ),
        )}

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex h-10 min-w-10 items-center justify-center rounded-xl border bg-white disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
