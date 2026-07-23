'use client';

export default function AdminCouponTableSkeleton({ rows = 6 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className="h-14 border-b dark:border-gray-800">
          <td colSpan="7" className="px-4">
            <div className="h-5 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </td>
        </tr>
      ))}
    </>
  );
}
