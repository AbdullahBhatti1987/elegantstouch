'use client';

import { Plus, Search, Grid2X2, List } from 'lucide-react';

export default function AdminPageHeader({
  title,
  description,
  searchPlaceholder = 'Search...',
  addText = 'Add New',
  onAdd,
  view,
  setView,
}) {
  return (
    <div className="my-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="text-sm text-gray-500">{description}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder={searchPlaceholder}
            className="w-84 rounded-lg border bg-white py-2 pr-4 pl-10 outline-none dark:bg-gray-900"
          />
        </div>

        {/* Add Button */}
        {addText && onAdd && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white"
          >
            <Plus size={18} />
            {addText}
          </button>
        )}

        
        {/* View Buttons */}
        <div className="flex overflow-hidden rounded-lg border">
          <button
            onClick={() => setView('grid')}
            className={`px-2 py-2.5 ${
              view === 'grid'
                ? 'bg-black text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            } `}
          >
            <Grid2X2 size={18} />
          </button>

          <button
            onClick={() => setView('list')}
            className={`px-2 py-2.5 ${
              view === 'list'
                ? 'bg-black text-white'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            } `}
          >
            <List size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
