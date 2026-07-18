'use client';

import Loader from '@/components/common/Loader';
import AdminCategoryCard from './AdminCategoryCard';
import EmptyCategoryState from './EmptyCategoryState';
import Link from 'next/link';

export default function CategoryGrid({ categories = [], loading }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
      {loading ? (
        <Loader count={8} />
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <AdminCategoryCard key={category._id} category={category} />
        ))
      ) : (
        <EmptyCategoryState
          // action={
          //   <Link
          //     href="/dashboard/categories/create"
          //     className="rounded-lg bg-[#005b96] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          //   >
          //     Add New Category
          //   </Link>
          // }
        />
      )}
    </div>
  );
}
