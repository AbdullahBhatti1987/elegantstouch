'use client';

import FlashSaleCard from './FlashSaleCard';
import FlashSaleSkeleton from './FlashSaleSkeleton';

export default function FlashSaleGrid({ flashSales, loading }) {
  if (loading) {
    return <FlashSaleSkeleton />;
  }

  if (!flashSales?.length) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center text-gray-500 dark:border-neutral-700 dark:bg-neutral-900">
        No flash sales found
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {flashSales.map((sale) => (
        <FlashSaleCard key={sale._id} sale={sale} />
      ))}
    </div>
  );
}
