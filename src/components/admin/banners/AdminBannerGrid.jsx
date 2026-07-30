'use client';

import EmptyState from '../common/emptyState/EmptyState';
import Loader from '../common/loaders/Loader';
import BannerCard from './BannerCard';

export default function AdminBannerGrid({
  banners = [],
  loading = false,
}) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {loading ? (
          <Loader type="bannerGrid" count={8} />
        ) : banners.length > 0 ? (
          banners.map((banner) => (
            <BannerCard key={banner._id} banner={banner} />
          ))
        ) : (
          <EmptyState
            title="No Banner Available"
            description="No active banners are available at the moment. Add a banner from the admin panel to display it here."
            action={
              <button className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
                Clear Filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
