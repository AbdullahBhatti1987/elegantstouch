// 'use client';

// export default function WishlistFilters({
//   filter,
//   setFilter,
//   sort,
//   setSort,
// }) {
//   return (
//     <div className="mb-6 flex items-center justify-between gap-4  md:flex-row">
//       <div>
//         <select
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//           className="rounded-lg border px-4 py-2"
//         >
//           <option value="all">All Products</option>
//           <option value="inStock">In Stock</option>
//           <option value="outOfStock">Out of Stock</option>
//         </select>
//       </div>

//       <div>
//         <select
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//           className="rounded-lg border px-4 py-2"
//         >
//           <option value="newest">Newest First</option>

//           <option value="low">Price Low → High</option>

//           <option value="high">Price High → Low</option>

//           <option value="name">Name A → Z</option>
//         </select>
//       </div>
//     </div>
//   );
// }

'use client';

import CustomDropdown from "../admin/common/form/CustomDropdown";


export default function WishlistFilters({
  filter,
  setFilter,
  sort,
  setSort,
}) {
  const filterOptions = [
    {
      label: 'All Products',
      value: 'all',
    },
    {
      label: 'In Stock',
      value: 'inStock',
    },
    {
      label: 'Out of Stock',
      value: 'outOfStock',
    },
  ];

  const sortOptions = [
    {
      label: 'Newest First',
      value: 'newest',
    },
    {
      label: 'Price Low → High',
      value: 'low',
    },
    {
      label: 'Price High → Low',
      value: 'high',
    },
    {
      label: 'Name A → Z',
      value: 'name',
    },
  ];

  return (
    <div className="mb-6 flex items-center justify-between gap-4">
      <CustomDropdown
        options={filterOptions}
        value={filter}
        onChange={setFilter}
        placeholder="Filter Products"
      />

      <CustomDropdown
        options={sortOptions}
        value={sort}
        onChange={setSort}
        placeholder="Sort Products"
      />
    </div>
  );
}
