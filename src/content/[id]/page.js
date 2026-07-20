'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PriceRangeFilter from '@/components/tools/PriceRangeFilter';

export default function CategoryPage() {
  const params = useParams();
  console.log('params=>>', params);
  const categoryId = params.id;
  console.log('categoryId=>>', categoryId);

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `/api/products?category=${categoryId}`,
      );
      console.log('res==>', res);

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
    fetchProducts();
  }, [params.id]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };

  let filteredProducts = products.filter((p) => {
    return (
      p.categoryId?.slug === categoryId &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
    );
  });

  if (sort === 'low') {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === 'high') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <main className="flex flex-col gap-6 bg-gray-50 px-4 py-10 md:flex-row md:px-12 dark:bg-zinc-950">
      <PriceRangeFilter
        values={priceRange}
        setValues={setPriceRange}
      />

      <section className="flex-1">
        {/* Header */}

        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm dark:bg-zinc-900">
          <div>
            <h2 className="text-xl font-bold">Products</h2>

            <p className="text-sm text-gray-500">
              {filteredProducts.length} items available
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm dark:bg-zinc-800"
          >
            <option value="default">Sort By</option>

            <option value="low">Price Low</option>

            <option value="high">Price High</option>
          </select>
        </div>

        {/* Products Grid */}

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <p>Loading products...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:bg-zinc-900"
              >
                {/* IMAGE */}

                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={
                      product.images?.[0]?.thumbnail ||
                      '/images/placeholder.jpg'
                    }

                    alt={product.name}

                    fill

                    sizes="
                (max-width:640px) 50vw,
                (max-width:1024px) 33vw,
                25vw
                "

                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Wishlist */}

                  <button
                    onClick={() => toggleWishlist(product._id)}

                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow"
                  >
                    <Heart
                      size={20}
                      className={
                        wishlist.includes(product._id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-700'
                      }
                    />
                  </button>

                  {product.badge && (
                    <span className="absolute top-3 left-3 rounded-full bg-pink-500 px-3 py-1 text-xs text-white">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* CONTENT */}

                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    {product.categoryId?.name}
                  </p>

                  <h3 className="mt-1 line-clamp-2 font-semibold">
                    {product.name}
                  </h3>

                  {/* Rating */}

                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-xs">4.8</span>
                  </div>

                  {/* PRICE */}

                  <div className="mt-3">
                    {product.salePrice ? (
                      <>
                        <span className="font-bold text-pink-500">
                          Rs {product.salePrice}
                        </span>

                        <span className="ml-2 text-xs text-gray-400 line-through">
                          Rs {product.price}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold">
                        Rs {product.price}
                      </span>
                    )}
                  </div>

                  {/* CART BUTTON */}

                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2 text-sm text-white transition hover:bg-gray-800">
                    <ShoppingCart size={16} />
                    Add Cart
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
