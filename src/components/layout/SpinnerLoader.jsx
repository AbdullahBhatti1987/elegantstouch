'use client';

export default function SpinnerLoader({ loading = false }) {
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 z-[9999] h-1 w-full overflow-hidden bg-transparent">
      <div className="animate-loading h-full w-1/3 bg-black" />
    </div>
  );
}
