'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const router = useRouter();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 dark:bg-gray-900">
      <h1
        onClick={() => router.push('/')}
        className="cursor-pointer text-lg font-semibold hover:opacity-80"
      >
        Admin Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
          A
        </div>
      </div>
    </header>
  );
}
