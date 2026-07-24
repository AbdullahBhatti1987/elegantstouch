'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminPageTitle({
  title,
  description,
  backUrl,
  buttonText = 'Back',
}) {
  const router = useRouter();

  return (
    <div className="mb-4 flex items-center justify-between">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>

        {description && (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        )}
      </div>

      {/* Back Button */}
      <button
        type="button"
        onClick={() => router.push(backUrl)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2"
      >
        <ArrowLeft size={18} />

        {buttonText}
      </button>
    </div>
  );
}
