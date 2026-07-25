'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminCategoryCard from './AdminCategoryCard';
import EmptyState from '../common/emptyState/EmptyState';

export default function CategoryGrid({
  categories = [],
  loading,
  counts,
}) {



  
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader type='categoryGrid' count={8} />
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <AdminCategoryCard
            key={category._id}
            category={category}
            counts={counts}
          />
        ))
      ) : (
        categories.length == 0 & !loading && <EmptyState
          title="No Categories Found"
          description="Please add categories from dashboard."
        />
      )}
    </div>
  );
}
