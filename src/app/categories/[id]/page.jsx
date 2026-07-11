"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { products } from "@/content/data";
import PriceRangeFilter from "@/components/tools/PriceRangeFilter";

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [sort, setSort] = useState("default");
  const [priceRange, setPriceRange] = useState([500, 2000]);

let filteredProducts = products.filter((p) => {
  return (
    p.category === categoryId &&
    p.price >= priceRange[0] &&
    p.price <= priceRange[1]
  );
});

// SORTING
if (sort === "low") {
  filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
}

if (sort === "high") {
  filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
}

  return (
    <main className="flex flex-col md:flex-row gap-6 px-6 md:px-12 py-10 bg-gray-50 dark:bg-zinc-950">
      {/* ================= LEFT SIDEBAR FILTER ================= */}
      <PriceRangeFilter values={priceRange} setValues={setPriceRange} />

      {/* ================= RIGHT SIDE ================= */}
      <section className="flex-1">
        {/* SORT BAR */}
        <div className="flex justify-between items-center mb-6 bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Products
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 rounded-lg border dark:bg-zinc-800 dark:border-zinc-700"
          >
            <option value="default">Sort By</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white dark:bg-zinc-900 rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                    {p.name}
                  </h3>

                  <p className="text-pink-500 font-bold mt-1">Rs {p.price}</p>

                  <button className="mt-3 w-full py-2 text-sm bg-black text-white dark:bg-white dark:text-black rounded-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
