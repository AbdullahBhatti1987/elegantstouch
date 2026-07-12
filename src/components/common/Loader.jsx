'use client';

import AdminCategorySkeleton from "../admin/common/skeleton/AdminCategorySkeleton";

export default function Loader() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
     {Array.from({ length: 8 }).map((_, index) => (
  <div
    key={index}
    className={`
      ${index >= 4 ? 'hidden sm:block' : ''}
      ${index >= 6 ? 'md:hidden lg:block' : ''}
    `}
  >
    <AdminCategorySkeleton />
  </div>
))}
    </div>
  );
}