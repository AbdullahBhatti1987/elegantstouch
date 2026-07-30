import React from 'react';

export function Info({ label, value }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-zinc-700 dark:bg-zinc-800">
      {/* Label */}
      <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
        {label}
      </p>

      {/* Value */}
      <p className="mt-1 capitalize text-sm font-medium text-gray-900 dark:text-white">
        {value || '-'}
      </p>
    </div>
  );
}
