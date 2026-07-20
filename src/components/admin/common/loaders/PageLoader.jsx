'use client';

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex h-16 w-16 animate-spin items-center justify-center rounded-full border-4 border-gray-300 border-t-[#f8a5c2]">
        <div className="h-12 w-12 reverse-spin rounded-full border-4 border-gray-300 border-t-[#f8a5c2] [animation-direction:reverse]" />
      </div>
    </div>
  );
}
