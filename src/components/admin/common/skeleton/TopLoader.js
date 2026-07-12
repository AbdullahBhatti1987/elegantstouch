"use client";

export default function TopLoader() {
  return (
    <div className="fixed top-0 left-0 z-[9999] h-1 w-full overflow-hidden">
      <div className="h-full w-1/3 animate-loading bg-black dark:bg-white"></div>
    </div>
  );
}