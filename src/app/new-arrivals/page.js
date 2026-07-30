// // // import { products } from "@/content/data";
// // // import Link from "next/link";

// // // export const metadata = {
// // //   title: "New Arrivals | Baby Princess",
// // //   description:
// // //     "Explore the latest baby girl hair accessories, jewellery, clips, and gift sets recently added to our collection.",
// // // };

// // // export default function NewArrivalsPage() {
// // //   //   const newArrivals = products.filter((product) => product.isNew);
// // //   //   const newArrivals = products.filter((product) => product.bedge === "New Arrival");
// // //   const newArrivals = products.filter((product) => {
// // //     const created = new Date(product.createdAt);
// // //     const today = new Date();

// // //     return (today - created) / (1000 * 60 * 60 * 24) <= 30;
// // //   });

// // //   return (
// // //     <main className="bg-white min-h-screen">
// // //       {/* Hero */}
// // //       <section className="bg-pink-50 py-16">
// // //         <div className="container mx-auto px-4 text-center">
// // //           <p className="text-pink-600 font-semibold uppercase">
// // //             Fresh Collection
// // //           </p>

// // //           <h1 className="mt-3 text-4xl font-bold">New Arrivals</h1>

// // //           <p className="mt-4 max-w-2xl mx-auto text-gray-600">
// // //             Discover the latest additions to our collection of premium baby girl
// // //             accessories.
// // //           </p>
// // //         </div>
// // //       </section>

// // //       {/* Products */}
// // //       <section className="container mx-auto px-4 py-16">
// // //         {newArrivals.length === 0 ? (
// // //           <div className="text-center text-gray-500">
// // //             No new arrivals available.
// // //           </div>
// // //         ) : (
// // //           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
// // //             {newArrivals.map((product) => (
// // //               <div
// // //                 key={product.id}
// // //                 className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:shadow-lg"
// // //               >
// // //                 <img
// // //                   src={product.image}
// // //                   alt={product.name}
// // //                   className="h-64 w-full object-cover"
// // //                 />

// // //                 <div className="p-5">
// // //                   <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
// // //                     New Arrival
// // //                   </span>

// // //                   <h2 className="mt-3 text-lg font-semibold">{product.name}</h2>

// // //                   <p className="text-sm text-gray-500">{product.category}</p>

// // //                   <div className="mt-3 flex items-center gap-2">
// // //                     {product.salePrice ? (
// // //                       <>
// // //                         <span className="text-xl font-bold text-pink-600">
// // //                           Rs {product.salePrice}
// // //                         </span>

// // //                         <span className="text-sm text-gray-400 line-through">
// // //                           Rs {product.price}
// // //                         </span>
// // //                       </>
// // //                     ) : (
// // //                       <span className="text-xl font-bold text-pink-600">
// // //                         Rs {product.price}
// // //                       </span>
// // //                     )}
// // //                   </div>

// // //                   <Link
// // //                     href={`/products/${product.slug}`}
// // //                     className="mt-5 block rounded-lg bg-pink-600 py-3 text-center font-medium text-white transition hover:bg-pink-700"
// // //                   >
// // //                     View Product
// // //                   </Link>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         )}
// // //       </section>
// // //     </main>
// // //   );
// // // }

// // 'use client';

// // import { useCallback, useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { useRouter } from 'next/navigation';

// // import ProductCard from '@/components/products/ProductCard';
// // import PageLoader from '@/components/admin/common/loaders/PageLoader';
// // import Pagination from '@/components/admin/common/Pagination';
// // import { useCart } from '@/context/CartContext';
// // import { useWishlist } from '@/context/WishlistContext';
// // import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';
// // import SectionHeader from '@/components/common/SectionHeader';

// // export default function NewArrivalsPage() {
// //   const [products, setProducts] = useState([]);

// //   const [loading, setLoading] = useState(true);
// //  const [pagination, setPagination] = useState({
// //     page: 1,
// //     totalPages: 1,
// //     total: 0,
// //     limit: 8,
// //   });
// //   const router = useRouter();
// //   const { addToCart, isInCart } = useCart();
// //   const { addToWishlist, isInWishlist, removeFromWishlist } =
// //     useWishlist();

// //   const fetchProducts = useCallback(
// //     async (currentPage = 1) => {
// //       try {
// //         setLoading(true);

// //         const { data } = await axios.get(
// //           `/api/products?page=${currentPage}&limit=${pagination.limit}&badge=New Arrival`,
// //         );

// //         if (data.success) {
// //           setProducts(data.data);
// //           setPagination(data.pagination);
// //         }
// //       } catch (error) {
// //         console.error('Products Fetch Error:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     },
// //     [pagination.limit],
// //   );
// //   useEffect(() => {
// //     fetchProducts(pagination.page);
// //   }, [fetchProducts, pagination.page]);

// //   // Wishlist Toggle

// //   const handlePageChange = (newPage) => {
// //      setPagination((prev) => ({
// //     ...prev,
// //     page: newPage,
// //   }));

// //     fetchProducts(newPage);
// //   };

// //   return (
// //     <section className="m-auto w-full max-w-7xl bg-white py-4 dark:bg-black">
// //       {/* Header */}

// // <SectionHeader
// //           // icon={Tag}
// //           title="Products"
// //           description="Best collections curated just for you."
// //         />

// //       {/* Product Grid */}

// //       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
// //         {loading ? (
// //           Array.from({ length: 8 }).map((_, index) => (
// //             <ProductCardSkeleton key={index} />
// //           ))
// //         ) : products.length > 0 ? (
// //           products.map((product) => (
// //             <ProductCard
// //               key={product._id}
// //               product={product}
// //               showWishlistButton={true}
// //               addToWishlist={addToWishlist}
// //               isInWishlist={isInWishlist(product._id)}
// //               removeFromWishlist={removeFromWishlist}
// //               addToCart={addToCart}
// //               isInCart={isInCart(product._id)}
// //               showCartButton={true}
// //               showRating={true}
// //               onClick={() => router.push(`/products/${product.slug}`)}
// //             />
// //           ))
// //         ) : (
// //           <p className="col-span-full py-10 text-center text-gray-500">
// //             No products found
// //           </p>
// //         )}
// //       </div>

// //       {/* Pagination */}

// //       <div className="mt-10 flex justify-center">
// //         <Pagination
// //           pagination={pagination}
// //           onPageChange={handlePageChange}
// //         />
// //       </div>
// //     </section>
// //   );
// // }

// 'use client';

// import { useCallback, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// import ProductCard from '@/components/products/ProductCard';
// import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';
// import { useCart } from '@/context/CartContext';
// import { useWishlist } from '@/context/WishlistContext';
// import SectionHeader from '@/components/common/SectionHeader';

// export default function NewArrivalsPage() {
//   const [products, setProducts] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);

//   const loaderRef = useRef(null);

//   const limit = 8;

//   const router = useRouter();

//   const { addToCart, isInCart } = useCart();

//   const { addToWishlist, isInWishlist, removeFromWishlist } =
//     useWishlist();

//   const fetchProducts = useCallback(async (currentPage = 1) => {
//     try {
//       if (currentPage === 1) {
//         setLoading(true);
//       } else {
//         setLoadingMore(true);
//       }

//       const { data } = await axios.get(
//         `/api/products?page=${currentPage}&limit=${limit}&badge=New Arrival`,
//       );

//       if (data.success) {
//         setProducts((prev) =>
//           currentPage === 1 ? data.data : [...prev, ...data.data],
//         );

//         setHasMore(data.pagination.page < data.pagination.totalPages);
//       }
//     } catch (error) {
//       console.error('Products Fetch Error:', error);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   }, []);

//   // First Load

//   useEffect(() => {
//     fetchProducts(1);
//   }, [fetchProducts]);

//   // Infinite Scroll

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && hasMore && !loadingMore) {
//           const nextPage = page + 1;

//           setPage(nextPage);

//           fetchProducts(nextPage);
//         }
//       },
//       {
//         threshold: 0,
//         rootMargin: '300px',
//       },
//     );

//     const loader = loaderRef.current;

//     if (loader) {
//       observer.observe(loader);
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, [page, hasMore, loadingMore, fetchProducts]);

//   return (
//     <section className="m-auto w-full max-w-7xl bg-white px-4 py-4 dark:bg-black">
//       <SectionHeader
//         title="New Arrivals"
//         description="Best collections curated just for you."
//       />

//       {/* Product Grid */}

//       <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
//         {loading ? (
//           Array.from({ length: 8 }).map((_, index) => (
//             <ProductCardSkeleton key={index} />
//           ))
//         ) : products.length > 0 ? (
//           products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}

//               showWishlistButton={true}
//               addToWishlist={addToWishlist}
//               isInWishlist={isInWishlist(product._id)}
//               removeFromWishlist={removeFromWishlist}

//               addToCart={addToCart}
//               isInCart={isInCart(product._id)}

//               showCartButton={true}
//               showRating={true}

//               onClick={() => router.push(`/products/${product.slug}`)}
//             />
//           ))
//         ) : (
//           <p className="col-span-full py-10 text-center text-gray-500">
//             No products found
//           </p>
//         )}
//       </div>

//       {/* Infinite Scroll Loader */}

//       <div ref={loaderRef} className="flex justify-center py-10">
//         {loadingMore && (
//           <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
//         )}
//       </div>
//     </section>
//   );
// }

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import ProductCard from '@/components/products/ProductCard';
import ProductCardSkeleton from '@/components/products/ProductCardSkeleton';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import SectionHeader from '@/components/common/SectionHeader';

export default function NewArrivalsPage() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const limit = 8;

  const router = useRouter();

  const { addToCart, isInCart } = useCart();

  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();

  const fetchProducts = useCallback(async (currentPage = 1) => {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const { data } = await axios.get(
        `/api/products?page=${currentPage}&limit=${limit}&badge=New Arrival`,
      );

      if (data.success) {
        setProducts((prev) =>
          currentPage === 1 ? data.data : [...prev, ...data.data],
        );

        setHasMore(data.pagination.page < data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Products Fetch Error:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // First Load

  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  // Infinite Scroll

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingMore) {
          const nextPage = page + 1;

          setPage(nextPage);

          fetchProducts(nextPage);
        }
      },
      {
        threshold: 0,
        rootMargin: '300px',
      },
    );

    const loader = loaderRef.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      observer.disconnect();
    };
  }, [page, hasMore, loadingMore, fetchProducts]);

  return (
    <section className="m-auto w-full max-w-7xl bg-white px-4 py-4 dark:bg-black">
      <SectionHeader
        title="New Arrivals"
        description="Best collections curated just for you."
      />

      {/* Product Grid */}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}

              showWishlistButton={true}
              addToWishlist={addToWishlist}
              isInWishlist={isInWishlist(product._id)}
              removeFromWishlist={removeFromWishlist}

              addToCart={addToCart}
              isInCart={isInCart(product._id)}

              showCartButton={true}
              showRating={true}

              onClick={() => router.push(`/products/${product.slug}`)}
            />
          ))
        ) : (
          <p className="col-span-full py-10 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* Infinite Scroll Loader */}

      <div ref={loaderRef} className="flex justify-center py-10">
        {loadingMore && (
          <div className="border-t-primary h-8 w-8 animate-spin rounded-full border-4 border-gray-300" />
        )}
      </div>
    </section>
  );
}
