'use client';

import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import FlashSaleSkeleton from './FlashSaleSkeleton';

export default function FlashSale() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Demo expiry time (24 hours)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        '/api/products?tag=flash-sale',
      );

      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Flash Sale Products Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();

      const distance = expiry - now;

      if (distance <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return <FlashSaleSkeleton />;
  }

  return (
    <section className="bg-neutral-100 px-6 py-8 md:px-12 md:py-16 dark:bg-neutral-800">
      <div className="mx-auto">
        {/* Header */}

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <span className="inline-block rounded-full bg-red-500 px-4 py-1 text-sm text-white">
              Limited Time Offer
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Flash Sale 🔥
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Grab your favorite accessories before the deal ends.
            </p>
          </div>

          {/* Countdown */}

          <div className="flex gap-3">
            {[
              ['Days', timeLeft.days],
              ['Hours', timeLeft.hours],
              ['Min', timeLeft.minutes],
              ['Sec', timeLeft.seconds],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white shadow dark:bg-neutral-800"
              >
                <span className="text-xl font-bold text-rose-600">
                  {String(value).padStart(2, '0')}
                </span>

                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products */}

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => {
            const discount =
              product.price && product.salePrice
                ? Math.round(
                    ((product.price - product.salePrice) /
                      product.price) *
                      100,
                  )
                : 0;

            return (
              <div
                key={product._id}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-neutral-700 dark:bg-neutral-900"
              >
                {/* Square Image */}

                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={
                      product.images?.[0]?.thumbnail ||
                      product.images?.[0]?.url
                    }
                    alt={product.name}
                    fill
                    sizes={200}
                    priority
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute top-2 left-2 rounded-lg bg-rose-500 px-2 py-1 text-[10px] font-semibold text-white">
                    SALE
                  </span>

                  {discount > 0 && (
                    <div className="absolute top-2 right-2 flex items-center justify-center rounded-lg bg-white px-2 py-1 shadow-md">
                      <span className="text-xs font-extrabold text-rose-600">
                        {discount}% OFF
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Content */}

                <div className="p-3">
                  <h3 className="line-clamp-1 text-xs font-semibold text-neutral-900 dark:text-white">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-sm font-bold text-rose-600">
                      Rs {product.salePrice}
                    </span>

                    <span className="text-xs text-neutral-400 line-through">
                      Rs {product.price}
                    </span>
                  </div>

                  <Link
                    href={`/products/${product._id}`}
                    className="mt-2 block rounded-lg bg-neutral-900 py-2 text-center text-xs font-semibold text-white uppercase dark:bg-white dark:text-black"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
