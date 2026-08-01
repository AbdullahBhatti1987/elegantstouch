'use client';

import { Toaster } from 'react-hot-toast';
import { CheckCircle, XCircle, LoaderCircle } from 'lucide-react';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      containerClassName="toast-container"
    >
      {(t) => {
        const isSuccess = t.type === 'success';
        const isError = t.type === 'error';

        return (
          <div
            className={`relative flex items-start gap-3 overflow-hidden rounded-lg border-1 border-gray-400 bg-white/80 px-4 py-3 shadow-xl backdrop-blur-md transition-all dark:border-zinc-800 dark:bg-zinc-900/95`}
          >
            {/* Icon */}

            <div className="pt-0.5">
              {isSuccess && (
                <CheckCircle size={22} className="text-green-500" />
              )}

              {isError && (
                <XCircle size={22} className="text-red-500" />
              )}

              {!isSuccess && !isError && (
                <LoaderCircle
                  size={22}
                  className="animate-spin text-[#005b96]"
                />
              )}
            </div>

            {/* Message */}

            <div className="flex-1 text-sm font-medium text-gray-800 dark:text-white">
              {t.message}
            </div>

            {/* Close Line */}

            <div
              className="absolute right-0 bottom-0 h-1 bg-[#005b96]"
              style={{
                animation: `toast-progress ${
                  t.duration || 2000
                }ms linear forwards`,
              }}
            />
          </div>
        );
      }}
    </Toaster>
  );
}
