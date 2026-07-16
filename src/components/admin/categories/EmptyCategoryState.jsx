'use client';

import { Shapes } from 'lucide-react';

export default function EmptyCategoryState({
  title = 'No Categories Found',
  description = 'There are currently no categories available. Please add a category or check back later.',
  action,
}) {
  return (
    <div className="col-span-full">
      <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center shadow-sm transition-colors dark:border-gray-800 dark:bg-gray-900">
        {/* Icon */}
        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <Shapes className="h-10 w-10 text-[#005b96]" />
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Description */}
        <p className="max-w-md text-sm leading-6 text-gray-500 dark:text-gray-400">
          {description}
        </p>

        {/* Optional Action */}
        {action && <div className="mt-6">{action}</div>}
      </div>
    </div>
  );
}
