'use client';

export default function ScreenLoader({ text = 'Loading...' }) {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-zinc-950/80">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="border-t-primary h-12 w-12 animate-spin rounded-full border-4 border-gray-200"></div>

        {text && (
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {text}
          </p>
        )}
      </div>
    </div>
  );
}
