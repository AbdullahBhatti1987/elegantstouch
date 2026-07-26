// 'use client';

// export default function CategoryFilter({
//   categories = [],
//   selectedCategory,
//   setSelectedCategory,
// }) {
//   return (
//     <div className="mt-6 rounded-2xl border bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

//       <div className="space-y-2">
//         {/* All Products */}

//         <button
//           onClick={() => setSelectedCategory(null)}
//           className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
//             !selectedCategory
//               ? 'bg-black text-white dark:bg-white dark:text-black'
//               : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
//           } `}
//         >
//           All Categories
//         </button>

//         {categories.map((category) => (
//           <button
//             key={category._id}

//             onClick={() => setSelectedCategory(category._id)}

//             className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
//               selectedCategory === category._id
//                 ? 'bg-black text-white dark:bg-white dark:text-black'
//                 : 'hover:bg-gray-100 dark:hover:bg-zinc-800'
//             } `}
//           >
//             {category.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

'use client';

export default function CategoryFilter({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  return (
      <div className="sticky w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">

      {/* Category List */}
      <div className="scrollbar-hide space-y-1.5 overflow-y-auto pr-1">
        {/* All Categories */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-all duration-200 ${
            !selectedCategory
              ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800'
          } `}
        >
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setSelectedCategory(category)}
            className={`w-full rounded-lg px-3 py-1.5 text-left text-sm transition-all duration-200 ${
              selectedCategory === category._id
                ? 'bg-black text-white shadow-sm dark:bg-white dark:text-black'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800'
            } `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
