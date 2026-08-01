'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const [values, setValues] = useState([0, 100000]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingRef = useRef(false);
  const loaderRef = useRef(null);
  const [sort, setSort] = useState('default');
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 12,
    hasNextPage: false,
  });
  const scrollRef = useRef(null);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();

  // Fetch Products

  const fetchProducts = useCallback(
    async (currentPage = 1) => {
      if (loadingRef.current) return;

      loadingRef.current = true;

      try {
        if (currentPage === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const { data } = await axios.get(
          `/api/products?page=${currentPage}&limit=12&search=${encodeURIComponent(search)}`,
        );

        if (data.success) {
          if (currentPage === 1) {
            setProducts(data.data);
          } else {
            setProducts((prev) => [...prev, ...data.data]);
          }

          setPagination(data.pagination);
        }
      } catch (error) {
        console.log(error);
      } finally {
        loadingRef.current = false;
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [search],
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

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    fetchProducts(page);
    if (page === 1) {
      fetchCategories();
    }
  }, [page, search, fetchProducts]);

  // Filters

  const filteredProducts = products.filter((product) => {
    const price = Number(product.salePrice || product.price);

    const priceMatch = price >= values[0] && price <= values[1];

    const categoryMatch =
      !selectedCategory ||
      product.categoryId?._id === selectedCategory._id;

    return priceMatch && categoryMatch;
  });

  const step = Math.max(
    1,
    Math.ceil((priceRange.maxPrice - priceRange.minPrice) / 100),
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

  useEffect(() => {
    const element = loaderRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          pagination.hasNextPage &&
          !loadingMore
        ) {
          setPage((prev) => prev + 1);
        }
      },
      {
        root: scrollRef.current,
        threshold: 0.5,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [pagination.hasNextPage, loadingMore]);

  return (
    <section className="flex h-[calc(100vh-80px)] gap-6 overflow-hidden bg-gray-50 p-4 dark:bg-zinc-950">
      {/* Sidebar Fixed */}
      <aside className="scrollbar-hide hidden h-[calc(100vh-100px)] w-64 shrink-0 overflow-y-auto md:block">
        <div className="space-y-6">
          <PriceRangeFilter
            values={[
              Math.max(values[0], priceRange.minPrice),
              Math.min(values[1], priceRange.maxPrice),
            ]}
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
      <div
        ref={scrollRef}
        className="flex min-w-0 flex-1 flex-col overflow-y-auto pr-2"
      >
        <CategoryProductList
          scrollRef={scrollRef}
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

        <div
          ref={loaderRef}
          className="flex h-20 items-center justify-center"
        >
          {loadingMore && (
            <div className="flex w-full items-center justify-center gap-3 py-8">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white" />

              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Loading more products...
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
