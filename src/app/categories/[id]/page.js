'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PriceRangeFilter from '@/components/tools/PriceRangeFilter';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [loading, setLoading] = useState(true);

  // GET PRODUCTS FROM DATABASE
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/products?category=${params.id}`,
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchProducts();
    }
  }, [params.id]);

  // FILTER PRODUCTS
  let filteredProducts = products.filter((p) => {
    return (
      p.categoryId?.slug === categoryId &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
    );
  });

  // SORTING
  if (sort === 'low') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price,
    );
  }

  if (sort === 'high') {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price,
    );
  }

  return (
    <main className="flex flex-col gap-6 bg-gray-50 px-6 py-10 md:flex-row md:px-12 dark:bg-zinc-950">
      <PriceRangeFilter
        values={priceRange}
        setValues={setPriceRange}
      />

      <section className="flex-1">
        <div className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow dark:bg-zinc-900">
          <h2 className="font-semibold text-gray-800 dark:text-white">
            Products
          </h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-3 py-2 dark:bg-zinc-800"
          >
            <option value="default">Sort By</option>

            <option value="low">Price: Low to High</option>

            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p._id}
                className="overflow-hidden rounded-xl bg-white shadow transition hover:shadow-xl dark:bg-zinc-900"
              >
                <div className="relative h-40 w-full">
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

                  <p className="mt-1 font-bold text-pink-500">
                    Rs {p.price}
                  </p>

                  <button className="mt-3 w-full rounded-lg bg-black py-2 text-sm text-white">
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
