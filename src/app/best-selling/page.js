// import { products } from "@/content/data";
// import Link from "next/link";

// export const metadata = {
//   title: "Best Selling Baby Accessories | Baby Princess",
//   description:
//     "Shop our best-selling baby girl hair accessories, jewellery, gift sets, and premium fashion essentials.",
// };

// export default function BestSellingPage() {
//   // Show only best-selling products
//   const bestSellingProducts = products.filter(
//     (product) => product.badge === "Best Seller"
//   );

//   return (
//     <main className="bg-white">
//       {/* Hero */}
//       <section className="bg-pink-50 py-16">
//         <div className="container mx-auto px-4 text-center">
//           <span className="text-pink-600 font-semibold uppercase tracking-wider">
//             Our Collection
//           </span>

//           <h1 className="mt-3 text-4xl font-bold text-gray-900">
//             Best Selling Products
//           </h1>

//           <p className="mt-4 max-w-2xl mx-auto text-gray-600">
//             Discover our customers' favorite baby accessories, including
//             beautiful hair bands, stylish clips, elegant jewellery, and luxury
//             gift sets.
//           </p>
//         </div>
//       </section>

//       {/* Products */}
//       <section className="container mx-auto px-4 py-16">
//         {bestSellingProducts.length === 0 ? (
//           <div className="text-center text-gray-500">
//             No best-selling products available.
//           </div>
//         ) : (
//           <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
//             {bestSellingProducts.map((product) => (
//               <div
//                 key={product.id}
//                 className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition"
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="h-64 w-full rounded-t-xl object-cover"
//                 />

//                 <div className="p-5">
//                   <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-700">
//                     {product.badge}
//                   </span>

//                   <h2 className="mt-3 text-lg font-semibold">
//                     {product.name}
//                   </h2>

//                   <p className="mt-1 text-sm text-gray-500">
//                     {product.category}
//                   </p>

//                   <div className="mt-3 flex items-center gap-2">
//                     {product.salePrice && (
//                       <span className="text-xl font-bold text-pink-600">
//                         Rs {product.salePrice}
//                       </span>
//                     )}

//                     {product.salePrice && (
//                       <span className="text-sm text-gray-400 line-through">
//                         Rs {product.price}
//                       </span>
//                     )}

//                     {!product.salePrice && (
//                       <span className="text-xl font-bold text-pink-600">
//                         Rs {product.price}
//                       </span>
//                     )}
//                   </div>

//                   <div className="mt-5">
//                     <Link
//                       href={`/products/${product.slug}`}
//                       className="block rounded-lg bg-pink-600 py-3 text-center font-medium text-white transition hover:bg-pink-700"
//                     >
//                       View Product
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }


import React from 'react'

function page() {
  return (
    <div>
      
    </div>
  )
}

export default page
