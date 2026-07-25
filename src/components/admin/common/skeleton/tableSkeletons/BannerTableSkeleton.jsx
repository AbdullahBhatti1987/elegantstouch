export default function BannerTableSkeleton() {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-sm">
        {/* Header */}
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="p-4 text-left">Image</th>

            <th className="p-4 text-left">Title</th>

            <th className="p-4 text-left">Status</th>

            <th className="p-4 text-left">Order</th>

            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 6 }).map((_, index) => (
            <tr key={index} className="animate-pulse border-b">
              {/* Image */}
              <td className="p-4">
                <div className="h-14 w-24 rounded-lg bg-gray-200" />
              </td>

              {/* Title */}
              <td className="p-4">
                <div className="h-4 w-40 rounded bg-gray-200" />
              </td>

              {/* Status */}
              <td className="p-4">
                <div className="h-6 w-16 rounded-full bg-gray-200" />
              </td>

              {/* Order */}
              <td className="p-4">
                <div className="h-4 w-10 rounded bg-gray-200" />
              </td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex justify-end gap-2">
                  <div className="h-9 w-9 rounded-lg bg-gray-200" />

                  <div className="h-9 w-9 rounded-lg bg-gray-200" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
