// 'use client';

// import { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// import ProductCard from '@/components/products/ProductCard';
// import PageLoader from '@/components/admin/common/loaders/PageLoader';
// import Pagination from '@/components/admin/common/Pagination';
// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';
// import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';

// export default function ProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [limit] = useState(12);
//   const [pagination, setPagination] = useState({});
//   const router = useRouter();
//   const { addToCart, isInCart } = useCart();
//   const { addToWishlist, isInWishlist, removeFromWishlist } =
//     useWishlist();

//   const fetchProducts = useCallback(
//     async (currentPage = 1) => {
//       try {
//         setLoading(true);

//         const { data } = await axios.get(
//           `/api/products?page=${currentPage}&limit=${limit}`,
//         );

//         if (data.success) {
//           setProducts(data.data);

//           setPagination(data.pagination);
//         }
//       } catch (error) {
//         console.error('Products Fetch Error:', error);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [limit],
//   );

//   useEffect(() => {
//     fetchProducts(page);
//   }, [fetchProducts, page]);

//   // Wishlist Toggle

//   const handlePageChange = (newPage) => {
//     setPage(newPage);

//     fetchProducts(newPage);
//   };

//   return (
//     <section className="m-auto w-full max-w-7xl bg-white px-6 py-4 md:px-12 dark:bg-black">
//       {/* Header */}

//       <div className="mb-4">
//         <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
//           Products
//         </h2>

//         <p className="mt-2 text-gray-500">
//           Best collections curated just for you
//         </p>
//       </div>

//       {/* Product Grid */}

//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
//         {loading
//           ? Array.from({ length: 8 }).map((_, index) => (
//               <ProductCardSkeleton key={index} />
//             ))
//           : products.length > 0 &&
//             products.map((product) => (
//               <ProductCard
//                 key={product._id}
//                 product={product}
//                 showWishlistButton={true}
//                 addToWishlist={addToWishlist}
//                 isInWishlist={isInWishlist(product._id)}
//                 removeFromWishlist={removeFromWishlist}
//                 addToCart={addToCart}
//                 isInCart={isInCart(product._id)}
//                 showCartButton={true}
//                 showRating={true}
//                 onClick={() =>
//                   router.push(`/products/${product.slug}`)
//                 }
//               />
//             ))}
//       </div>

//       {/* Pagination */}

//       <div className="mt-10 flex justify-center">
//         <Pagination
//           pagination={pagination}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </section>
//   );
// }

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
      product.categoryId?._id === selectedCategory;

    return priceMatch && categoryMatch;
  });

  const step = Math.ceil(
    (priceRange.maxPrice - priceRange.minPrice) / 100,
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

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
      <div className="min-w-0 flex-1 overflow-y-auto pr-2 hide-scrollbar">
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
        />
      </div>
    </section>
  );
}
