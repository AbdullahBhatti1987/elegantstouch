'use client';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import ProductCard from '@/components/products/ProductCard';
import Pagination from '@/components/admin/common/Pagination';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';

import PriceRangeFilter from '@/components/tools/PriceRangeFilter';
import CategoryFilter from '@/components/category/CategoryFilter';

import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import CategoryProductList from '@/components/products/CategoryProductList';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({
    minPrice: 0,
    maxPrice: 100000,
  });
  const [values, setValues] = useState([0, 100000]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);
  const [limit] = useState(12);
  const [pagination, setPagination] = useState({});
  const router = useRouter();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();

  // Fetch Products

  const fetchProducts = useCallback(
    async (currentPage = 1) => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/products?page=${currentPage}&limit=${limit}`,
        );

        if (data.success) {
          setProducts(data.data);

          setPagination(data.pagination);

          // price range from products

          const prices = data.data.map((item) =>
            Number(item.salePrice || item.price),
          );

          if (prices.length) {
            const min = Math.min(...prices);

            const max = Math.max(...prices);

            setPriceRange({
              minPrice: min,
              maxPrice: max,
            });

            setValues([min, max]);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  // Fetch Categories

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get('/api/categories/dropdown');

      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchProducts(page);
    fetchCategories();
  }, [page]);

  // Filters

  const filteredProducts = products.filter((product) => {
    const price = Number(product.salePrice || product.price);

    const priceMatch = price >= values[0] && price <= values[1];

    const categoryMatch =
      !selectedCategory ||
      product.categoryId?._id === selectedCategory._id;

    return priceMatch && categoryMatch;
  });

  const step = Math.ceil(
    (priceRange.maxPrice - priceRange.minPrice) / 100,
  );

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
    <section className="flex h-[calc(100vh-80px)] gap-6 overflow-hidden bg-gray-50 p-4 dark:bg-zinc-950">
      {/* Sidebar Fixed */}
      <aside className="scrollbar-hide hidden h-[calc(100vh-100px)] w-64 shrink-0 overflow-y-auto md:block">
        <div className="space-y-6">
          <PriceRangeFilter
            values={values}
            setValues={setValues}
            min={priceRange.minPrice}
            max={priceRange.maxPrice}
            step={step}
          />

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </aside>

      {/* Only Products Scroll */}
      <div className="hide-scrollbar min-w-0 flex-1 overflow-y-auto pr-2">
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
          categoryName={selectedCategory?.name}
        />
      </div>
    </section>
  );
}
