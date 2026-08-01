'use client';

import OffersGrid from '@/components/offer/OffersGrid';
import SectionHeader from '@/components/common/SectionHeader';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';

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
      <ScrollToTopButton className="right-6 bottom-20 md:right-10 md:bottom-8" />
    </section>
  );
}
