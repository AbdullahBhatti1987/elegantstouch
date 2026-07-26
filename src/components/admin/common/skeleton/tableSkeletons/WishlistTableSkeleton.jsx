'use client';

export default function WishlistTableSkeleton() {
  return (
    <tbody>
      {Array.from({
        length: 8,
      }).map((_, index) => (
        <tr
          key={index}

          className="animate-pulse border-b"
        >
          {Array.from({
            length: 5,
          }).map((_, i) => (
            <td
              key={i}

              className="px-4 py-4"
            >
              <div className="h-5 rounded bg-gray-200 dark:bg-zinc-800" />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}
