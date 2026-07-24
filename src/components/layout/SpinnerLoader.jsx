'use client';

import { useLoading } from '@/context/LoadingContext';

export default function SpinnerLoader() {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-[0.5px]">
      {/* Top Progress Bar */}
      <div className="absolute top-0 left-0 h-1 w-full overflow-hidden bg-transparent">
        <div className="animate-loading h-full w-1/3 bg-black" />
      </div>

      {/* Center Spinner */}
      <div className="relative h-16 w-16">
        {/* Outer Ring */}
        <div className="absolute inset-0 animate-spin rounded-full border-2 border-gray-300 border-t-[var(--primary)]"></div>

        {/* Inner Ring */}
        <div className="animate-spin-reverse absolute inset-2 rounded-full border-2 border-gray-200 border-b-[var(--primary)]"></div>
      </div>
    </div>
  );
}
