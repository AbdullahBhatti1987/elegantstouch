"use client";

import CategoryCard from "./CategoryCard";

export default function CategoryGrid({
  categories,
  onEdit,
  onDelete,
}) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}