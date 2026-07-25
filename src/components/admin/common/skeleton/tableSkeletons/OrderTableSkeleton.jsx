'use client';

export default function OrderTableSkeleton({ rows = 8 }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
      <table className="w-full table-fixed text-sm">
        <thead className="border-b bg-gray-50 dark:bg-gray-800">
          <tr className="h-14">
            <th className="p-4 text-left">Order ID</th>

            <th className="p-4 text-left">Customer</th>

            <th className="p-4 text-left">Items</th>

            <th className="p-4 text-left">Total</th>

            <th className="p-4 text-left">Payment</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="h-14 border-b">
              {/* Order ID */}
              <td className="p-4">
                <Skeleton width="w-32" />
              </td>

              {/* Customer */}
              <td className="p-4">
                <Skeleton width="w-28" />
              </td>

              {/* Items */}
              <td className="p-4">
                <Skeleton width="w-10" />
              </td>

              {/* Total */}
              <td className="p-4">
                <Skeleton width="w-24" />
              </td>

              {/* Payment */}
              <td className="p-4">
                <Skeleton width="w-20" />
              </td>

              {/* Status */}
              <td className="p-4">
                <div className="h-6 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700" />
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <div className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                  <div className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

                  <div className="h-9 w-9 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Skeleton({ width = 'w-24' }) {
  return (
    <div
      className={`h-4 ${width} animate-pulse rounded bg-gray-200 dark:bg-gray-700`}
    />
  );
}
