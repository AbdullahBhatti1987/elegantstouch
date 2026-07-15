'use client';

import { ClipLoader } from 'react-spinners';

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <ClipLoader
        size={50}
        speedMultiplier={0.8}
        color="#005b96"
        aria-label="Loading Spinner"
      />
    </div>
  );
}
