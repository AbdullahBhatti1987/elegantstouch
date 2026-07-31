'use client';

import OffersGrid from '@/components/offer/OffersGrid';
import SectionHeader from '@/components/common/SectionHeader';

export default function OffersPage() {
  return (
    <section className="min-h-[70vh] px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          title="Special Offers"
          description="Discover amazing deals and limited time discounts."
        />

        <OffersGrid />
      </div>
    </section>
  );
}
