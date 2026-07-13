'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export default function ConfirmModal({
  open,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  loading = false,

  // New Props
  requireText = '',
  placeholder = 'Type confirmation text',
}) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (!open) {
      setInputValue('');
    }
  }, [open]);

  if (!open) return null;

  const isConfirmed = requireText ? inputValue === requireText : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900">
        {/* Close */}

        <button
          onClick={onCancel}
          disabled={loading}
          className="absolute top-4 right-4 rounded-lg p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X size={20} />
        </button>

        {/* Icon */}

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={25} />
        </div>

        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="mt-2 text-sm text-gray-500">{message}</p>

        {/* Confirmation Input */}

        {requireText && (
          <div className="mt-5">
            <p className="mb-2 text-sm text-gray-600 dark:text-gray-300">
              Type <b className='text-red-600'>{requireText}</b> to confirm
            </p>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              disabled={loading}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-black dark:bg-gray-800 dark:text-white"
            />
          </div>
        )}

        {/* Buttons */}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading || !isConfirmed}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Deleting...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
