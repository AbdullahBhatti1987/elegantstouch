'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import PriceRangeFilter from '@/components/tools/PriceRangeFilter';
import { toast } from 'react-hot-toast';
import CategoryProductList from '@/components/products/CategoryProductList';

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
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/products?category=${categorySlug}`,
      );
      console.log('Data Fetching==>', data.data);
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

  const addToCart = async (product, quantity = 1) => {
    try {
      let guestId = localStorage.getItem('guestId');

      if (!guestId) {
        guestId = crypto.randomUUID();

        localStorage.setItem('guestId', guestId);
      }

      const { data } = await axios.post('/api/cart', {
        guestId,
        productId: product._id,
        quantity,
      });

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong');
      }

      console.log('ADD CART ERROR ==>', error.response?.data);
    }
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
    <main className="flex flex-col gap-6 bg-gray-50 p-4 md:flex-row md:pl-4 dark:bg-zinc-950">
      <div className="w-full shrink-0 md:w-64 lg:w-60">
        <PriceRangeFilter
          values={values}
          setValues={setValues}
          min={priceRange.minPrice}
          max={priceRange.maxPrice}
          step={step}
        />
      </div>

      <CategoryProductList
        filteredProducts={filteredProducts}
        loading={loading}
        sort={sort}
        setSort={setSort}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
      />
    </main>
  );
}
