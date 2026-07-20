'use client';

import Loader from '@/components/admin/common/loaders/Loader';
import AdminCategoryCard from './AdminCategoryCard';
import EmptyCategoryState from './EmptyCategoryState';

export default function CategoryGrid({ categories = [], counts=[] , loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader count={8} />
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <AdminCategoryCard key={category._id} category={category} counts={counts} />
        ))
      ) : (
        <EmptyCategoryState
         
        />
      )}
    </div>
  );
}
