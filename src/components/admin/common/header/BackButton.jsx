'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function BackButton() {
  const router = useRouter();

  return (
    <div className="flex gap-3">
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center gap-2 rounded-lg border bg-black px-4 py-2 text-white"
      >
        <ArrowLeft size={18} />
        Back
      </button>
    </div>
  );
}

export default BackButton;
