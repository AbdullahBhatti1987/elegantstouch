"use client";

import Image from "next/image";

export default function FeaturedProducts({ title = "Featured Products", products = [] }) {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-gray-50 dark:bg-zinc-950">

      {/* Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {title}
        </h2>
        <p className="text-gray-500 mt-2">
          Handpicked products just for you
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition group"
            >
              {/* Image */}
              <div className="relative w-full h-44 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h3>

                <p className="text-pink-500 font-bold mt-1">
                  {product.price}
                </p>

                <button className="mt-3 w-full py-2 text-sm rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-80 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
}