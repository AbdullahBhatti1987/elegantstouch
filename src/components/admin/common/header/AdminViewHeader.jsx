'use client';

import BackButton from './BackButton';

export default function AdminViewHeader({ title, subtitle }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      {/* Title Area */}
      <div>
        {/* Subtitle / Label */}
        {subtitle && (
          <p className="mb-1 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {subtitle}
          </p>
        )}

        {/* Main Heading */}
        <h1 className="line-clamp-1 text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
          {title}
        </h1>
      </div>

      {<BackButton />}
    </div>
  );
}
