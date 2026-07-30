'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import FlashSaleSkeleton from './FlashSaleSkeleton';
import ProductCard from '../products/ProductCard';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function FlashSale() {
  const [sale, setSale] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();

  // Fetch Active Flash Sale

  const fetchFlashSale = useCallback(async (page = 1) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/flash-sale/active?page=${page}&limit=12`,
      );

      if (data.success && data.data) {
        setSale(data.data);
        setProducts(data.data.products);
      }
    } catch (error) {
      console.error('Flash Sale Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlashSale(1);
  }, [fetchFlashSale]);

  // Countdown from DB endTime

  useEffect(() => {
    if (!sale?.endTime) return;

    const timer = setInterval(() => {
      const now = new Date().getTime();

      const expiry = new Date(sale.endTime).getTime();

      const distance = expiry - now;

      if (distance <= 0) {
        clearInterval(timer);

        setSale(null);

        setProducts([]);

        setVisibleProducts([]);

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
  }, [sale?.endTime]);

  if (loading) {
    return <FlashSaleSkeleton />;
  }

  if (!sale || !sale._id || products.length === 0) {
    return null;
  }

  return (
    <section className="bg-neutral-100 py-8 md:py-16 dark:bg-neutral-800">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}

        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row">
          <div>
            <span className="inline-block rounded-full bg-red-500 px-4 py-1 text-sm text-white">
              Limited Time Offer
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              {sale.title || 'Flash Sale'} 🔥
            </h2>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {sale.description ||
                'Grab your favorite accessories before the deal ends.'}
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

                className="flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-white shadow dark:bg-neutral-900"
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
              <ProductCard
                key={product._id}
                product={product}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                isInWishlist={isInWishlist(product._id)}
                addToCart={addToCart}
              showWishlistButton={false}
                isInCart={isInCart(product._id)}
                loading={loading}
                discount={discount}
                sale={sale}
                // onClick={() => router.push(`/products/${product._id}`)}
              />
            );
          })}
        </div>

        {/* Infinite Scroll Loader */}

        {products.length >= 12 && (
          <div className="mt-10 flex justify-center">
            <Link
              href="/offers"
              className="rounded-full bg-rose-600 px-8 py-3 text-sm font-bold text-white transition hover:bg-rose-700"
            >
              More Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
