'use client';

import AdminCategorySkeleton from '../skeleton/AdminCategorySkeleton';

export default function Loader({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <AdminCategorySkeleton key={index} />
      ))}
    </>
  );
}

