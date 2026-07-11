"use client";

import Image from "next/image";
import Link from "next/link";


export default function CategoriesFeatured({data}) {
  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white dark:bg-black">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          Explore Categories & Trending Products
        </h2>
        <p className="text-gray-500 mt-2">
          Best collections curated just for you
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
        {data.map((cat, index) => (
          <Link
            href={`/categories/${cat.slug}`}
            key={index}
            className="group bg-gray-100 dark:bg-zinc-900 rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative w-full h-28">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition duration-300"
              />
            </div>

            <div className="p-3 text-center font-medium text-gray-800 dark:text-white">
              {cat.name}
            </div>
          </Link>
        ))}
      </div>

    

    </section>
  );
}