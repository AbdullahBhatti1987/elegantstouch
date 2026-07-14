'use client';

export default function WishlistFilters({
  filter,
  setFilter,
  sort,
  setSort,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="all">All Products</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>

      <div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border px-4 py-2"
        >
          <option value="newest">Newest First</option>

          <option value="low">Price Low → High</option>

          <option value="high">Price High → Low</option>

          <option value="name">Name A → Z</option>
        </select>
      </div>
    </div>
  );
}
