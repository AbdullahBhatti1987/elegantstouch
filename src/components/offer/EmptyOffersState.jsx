'use client';

import { Sparkles, Tag } from 'lucide-react';

export default function EmptyOffersState() {
  return (
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
        We are preparing something exciting for you. New discounts and
        special deals will be available soon. Keep visiting Elegant
        Touch for the latest offers.
      </p>

      <div className="border-primary/20 bg-primary/5 mt-6 rounded-xl border px-6 py-3">
        <p className="text-primary text-sm">
          ✨ Great things are coming soon. Stay tuned!
        </p>
      </div>
    </div>
  );
}
