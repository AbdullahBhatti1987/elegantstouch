'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CategoryProductList from '@/components/products/CategoryProductList';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useLoading } from '@/context/LoadingContext';

export default function CategoryIdPage() {
  const params = useParams();
  console.log('Category Params==>', params);

  const categoryId = params.id;

  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('default');
  const [values, setValues] = useState([0, 9999]);
  const { addToCart, isInCart } = useCart();
  const [categoryName, setCategoryName] = useState('');
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 999999,
  });
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useWishlist();
  const { loading, startLoading, stopLoading } = useLoading();

  const fetchCategory = async () => {
    const { data } = await axios.get(`/api/categories/${categoryId}`);

    if (data.success) {
      setCategoryName(data.data.name);
    }
  };

  const fetchProducts = async () => {
    startLoading();
    try {
      const { data } = await axios.get(
        `/api/products?category=${categoryId}`,
      );
      // console.log('Data Fetching==>', data.data);
      if (data.success) {
        console.log('category data==>', data);
        setProducts(data.data);
      }
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      stopLoading();
    }
  };

  const getPriceRange = async () => {
    try {
      startLoading();
      const { data } = await axios.get('/api/products/price-range');
      // console.log('Data==>', data);
      if (data.success) {
        setPriceRange(data.data);

        setValues([data.data.minPrice, data.data.maxPrice]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchProducts();
      getPriceRange();
      fetchCategory();
    }
  }, [categoryId]);

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
    <section className="m-auto w-full max-w-7xl bg-white px-6 py-4 md:px-12 dark:bg-black">
      <CategoryProductList
        filteredProducts={filteredProducts}
        loading={loading}
        sort={sort}
        setSort={setSort}
        addToWishlist={addToWishlist}
        isInWishlist={isInWishlist}
        removeFromWishlist={removeFromWishlist}
        addToCart={addToCart}
        isInCart={isInCart}
        categoryName={categoryName}
      />
    </section>
  );
}
