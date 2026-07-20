
'use client';

import { useEffect, useState } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PriceRangeFilter from '@/components/tools/PriceRangeFilter';
import { toast } from 'react-hot-toast';
import Image from 'next/image';

export default function CategorySlugPage() {
  const params = useParams();
  const categorySlug = params.slug;
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 999999,
  });
  const [values, setValues] = useState([0, 9999]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `/api/products?category=${categorySlug}`,
      );
      console.log("Data Fetching==>",  data.data)
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const getPriceRange = async () => {
    try {
      const { data } = await axios.get('/api/products/price-range');
      console.log('Data==>', data);
      if (data.success) {
        setPriceRange(data.data);

        setValues([data.data.minPrice, data.data.maxPrice]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (categorySlug) {
      fetchProducts();

      getPriceRange();
    }
  }, [categorySlug]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id],
    );
  };
  const step = Math.ceil(
    (priceRange.maxPrice - priceRange.minPrice) / 100,
  );

  let filteredProducts = products.filter((product) => {
    const price = product.salePrice || product.price;

    return price >= values[0] && price <= values[1];
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
      <div className="w-full shrink-0 md:w-64 lg:w-72">
        <PriceRangeFilter
          values={values}

          setValues={setValues}

          min={priceRange.minPrice}

          max={priceRange.maxPrice}

          step={step}
        />
      </div>

        <section className="min-w-0 flex-1">
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
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={
                      product.images?.[0]?.thumbnail ||
                      '/images/placeholder.jpg'
                    }
                    alt={product.name}
                    fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />

                  <button
                    onClick={() => toggleWishlist(product._id)}
                    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow"
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
                </div>

                <div className="p-4">
                  <p className="text-xs text-gray-500">
                    {product.brand}
                  </p>

                  <h3 className="mt-1 line-clamp-2 font-semibold">
                    {product.name}
                  </h3>

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

                  <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-2 text-sm text-white">
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
