export default function BannerTableSkeleton({ rows = 8 }) {
  return (
     <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr
          key={index}
          className="h-14 border-b dark:border-gray-800"
        >
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
    </>
  );
}
