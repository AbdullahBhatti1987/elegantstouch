'use client';

import Loader from '@/components/common/Loader';
import AdminCategoryCard from './AdminCategoryCard';

export default function CategoryGrid({ categories, loading }) {
  
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
     
      {loading ? (
        <div className="col-span-full">
          <Loader count={4} />
        </div>
      ) : (
        categories.map((category) => (
          <AdminCategoryCard key={category._id} category={category} />
        ))
      )}
    </div>
  );
}
