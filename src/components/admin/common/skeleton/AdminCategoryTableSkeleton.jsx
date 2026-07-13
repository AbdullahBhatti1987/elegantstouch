// "use client";

// export default function AdminCategoryTableSkeleton({ rows = 8 }) {
//   return (
//     <div className="overflow-x-auto rounded-xl border bg-white dark:bg-gray-900">
//       <table className="w-full text-sm">
//         {/* Header */}
//         <thead className="border-b bg-gray-50 dark:bg-gray-800">
//           <tr className="h-14">
//             {[
//               "Image",
//               "Name",
//               "Slug",
//               "Products",
//               "Status",
//               "Featured",
//               "Actions",
//             ].map((item) => (
//               <th
//                 key={item}
//                 className="p-4 text-left"
//               >
//                 {item}
//               </th>
//             ))}
//           </tr>
//         </thead>

//         {/* Skeleton Rows */}
//         <tbody>
//           {Array.from({ length: rows }).map((_, index) => (
//             <tr
//               key={index}
//               className="h-14 border-b"
//             >
//               {/* Image */}
//               <td className="p-4">
//                 <div className="skeleton h-12 w-12 rounded-lg" />
//               </td>

//               {/* Name */}
//               <td className="p-4">
//                 <div className="skeleton h-4 w-32 rounded" />
//               </td>

//               {/* Slug */}
//               <td className="p-4">
//                 <div className="skeleton h-4 w-40 rounded" />
//               </td>

//               {/* Products */}
//               <td className="p-4">
//                 <div className="skeleton h-4 w-10 rounded" />
//               </td>

//               {/* Status */}
//               <td className="p-4">
//                 <div className="skeleton h-6 w-16 rounded-full" />
//               </td>

//               {/* Featured */}
//               <td className="p-4 text-center">
//                 <div className="skeleton mx-auto h-4 w-10 rounded" />
//               </td>

//               {/* Actions */}
//               <td className="p-4">
//                 <div className="flex justify-center gap-2">
//                   <div className="skeleton h-9 w-9 rounded-lg" />
//                   <div className="skeleton h-9 w-9 rounded-lg" />
//                 </div>
//               </td>

//             </tr>
//           ))}
//         </tbody>

//       </table>
//     </div>
//   );
// }

'use client';

export default function AdminCategoryTableSkeleton({ rows = 8 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index} className="h-14 border-b">
          {/* Image */}
          <td className="p-4">
            <div className="skeleton h-12 w-12 rounded-lg" />
          </td>

          {/* Name */}
          <td className="p-4">
            <div className="skeleton h-4 w-32 rounded" />
          </td>

          {/* Slug */}
          <td className="p-4">
            <div className="skeleton h-4 w-40 rounded" />
          </td>

          {/* Products */}
          <td className="p-4">
            <div className="skeleton h-4 w-10 rounded" />
          </td>

          {/* Status */}
          <td className="p-4">
            <div className="skeleton h-6 w-16 rounded-full" />
          </td>

          {/* Featured */}
          <td className="p-4 text-center">
            <div className="skeleton mx-auto h-4 w-10 rounded" />
          </td>

          {/* Actions */}
          <td className="p-4">
            <div className="flex justify-center gap-2">
              <div className="skeleton h-9 w-9 rounded-lg" />

              <div className="skeleton h-9 w-9 rounded-lg" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
