'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AdminCategoryGrid from '@/components/admin/categories/AdminCategoryGrid';
import AdminCategoryTable from '@/components/admin/categories/AdminCategoryTable';
import AdminPageHeader from '@/components/admin/common/AdminPageHeader';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState('grid');
  const [loading, setLoading] = useState('false');

  // GET CATEGORIES
  useEffect(() => {
    async function getCategories() {
      setLoading(true);
      try {
        const { data } = await axios.get('/api/categories');

        if (data.success) {
          setCategories(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    setLoading(false);
    getCategories();
  }, []);


  return (
    <div>
      <AdminPageHeader
        title="Categories"

        description="Manage your store categories"

        searchPlaceholder="Search categories..."

        addText="Add Category"

        view={view}

        setView={setView}

        onAdd={() => router.push('/dashboard/categories/add')}
      />

      {view === 'grid' ? (
        <AdminCategoryGrid categories={categories} loading={loading} />
      ) : (
        <AdminCategoryTable
          categories={categories}
          loading={loading}
        />
      )}
    </div>
  );
}
