'use client';

import { useState } from 'react';
import { Tag } from 'lucide-react';

import OffersGrid from '@/components/offer/OffersGrid';
import EmptyOffersState from '@/components/offer/EmptyOffersState';
import SectionHeader from '@/components/common/SectionHeader';

export default function OffersPage() {
  const [empty, setEmpty] = useState(false);

  return (
    <section className="min-h-[70vh] px-4 py-4">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          // icon={Tag}
          title="Special Offers"
          description="Discover amazing deals and limited time discounts."
        />

        {empty ? (
          <EmptyOffersState />
        ) : (
          <OffersGrid onEmpty={() => setEmpty(true)} />
        )}
      </div>
    </section>
  );
}
