'use client';

import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound({
  title = 'Data Not Found',
  message = 'The requested item could not be found.',
  buttonText = 'Go Back',
}) {
  const router = useRouter();

  return (
    <div className="flex min-h-[400px] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400">
          <AlertCircle size={30} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {message}
        </p>

        {/* Button */}
        <button
          onClick={() => router.back()}
          className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        >
          <ArrowLeft size={16} />
          {buttonText}
        </button>
      </div>
    </div>
  );
}
