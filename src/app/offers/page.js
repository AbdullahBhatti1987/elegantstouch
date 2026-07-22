'use client';

import AdminProductCard from '@/components/admin/products/AdminProductCard';
import { Tag, Sparkles } from 'lucide-react';


export default function OffersPage({ offers = [] }) {
  return (
    <section className="min-h-[70vh] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-10 text-center">
          <div className="mb-3 flex justify-center">
            <Tag size={45} className="text-primary" />
          </div>

          <h1 className="text-textcolor text-3xl font-bold">
            Special Offers
          </h1>

          <p className="mt-2 text-gray-500">
            Discover amazing deals and limited time discounts.
          </p>
        </div>

        {/* Offers Available */}
        {offers.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {offers.map((product) => (
              <AdminProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Empty Offer State */
          <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
            <div className="bg-primary/10 mb-6 rounded-full p-8">
              <Sparkles
                size={80}
                strokeWidth={1.5}
                className="text-primary"
              />
            </div>

            <h2 className="text-textcolor text-2xl font-semibold">
              No Special Offers Available Right Now
            </h2>

            <p className="mt-3 max-w-md text-gray-500">
              We are preparing something exciting for you. New
              discounts and special deals will be available soon. Keep
              visiting Elegant Touch for the latest offers.
            </p>

            <div className="border-primary/20 bg-primary/5 mt-6 rounded-xl border px-6 py-3">
              <p className="text-primary text-sm">
                ✨ Great things are coming soon. Stay tuned!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
