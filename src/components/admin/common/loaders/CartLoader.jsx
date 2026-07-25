'use client';

import AdminCartSkeleton from '../skeleton/gridSkeletons/CartGridSkeleton';


export default function CartLoader({
  count = 8,
}) {

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (

        <AdminCartSkeleton key={index} />

      ))}
    </>
  );
}