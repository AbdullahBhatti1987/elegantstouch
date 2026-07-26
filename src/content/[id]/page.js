'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PriceRangeFilter from '@/components/tools/PriceRangeFilter';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.id;

  const [products, setProducts] = useState([]);

  const [sort, setSort] = useState('default');

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const [rangeConfig, setRangeConfig] = useState({
    min: 0,
    max: 1000,
    step: 100,
  });

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/products?category=${categoryId}`,
      );

      if (data.success) {
        const productList = data.data;

        setProducts(productList);

        const prices = productList.map(
          (item) => item.salePrice || item.price,
        );

        if (prices.length) {
          const minPrice = Math.min(...prices);

          const maxPrice = Math.max(...prices);

          const step = 100;

          const roundedMin = Math.floor(minPrice / step) * step;

          const roundedMax = Math.ceil(maxPrice / step) * step;

          setRangeConfig({
            min: roundedMin,
            max: roundedMax,
            step,
          });

          setPriceRange([roundedMin, roundedMax]);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };

  let filteredProducts = products.filter((product) => {
    const price = product.salePrice || product.price;

    return price >= priceRange[0] && price <= priceRange[1];
  });

  if (sort === 'low') {
    filteredProducts.sort(
      (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price),
    );
  }

  if (sort === 'high') {
    filteredProducts.sort(
      (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price),
    );
  }

  return (
    <main className="flex flex-col gap-6 bg-gray-50 px-4 py-10 md:flex-row md:px-12 dark:bg-zinc-950">
      <div className="w-full md:w-64">
        <PriceRangeFilter
          values={priceRange}

          setValues={setPriceRange}

          min={rangeConfig.min}

          max={rangeConfig.max}

          step={rangeConfig.step}
        />
      </div>

      <section className="flex-1">
        <div className="mb-6 flex items-center justify-between rounded-2xl bg-white p-4 shadow dark:bg-zinc-900">
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl bg-white shadow dark:bg-zinc-900"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={
                      product.images?.[0]?.thumbnail ||
                      '/images/placeholder.jpg'
                    }

                    alt={product.name}
                    loading="eager"
                    fill

                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <button
                    onClick={() => toggleWishlist(product._id)}

                    className="absolute top-3 right-3 rounded-full bg-white p-2"
                  >
                    <Heart
                      size={18}

                      className={
                        wishlist.includes(product._id)
                          ? 'fill-red-500 text-red-500'
                          : ''
                      }
                    />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="line-clamp-2 font-semibold">
                    {product.name}
                  </h3>

                  <div className="mt-2 flex items-center gap-1">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-xs">4.8</span>
                  </div>

                  <p className="mt-3 font-bold">
                    Rs {product.salePrice || product.price}
                  </p>

                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2 text-white">
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
