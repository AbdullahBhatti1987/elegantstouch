'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import CategoryGrid from '@/components/admin/categories/CategoryGrid';
import CategoryTable from '@/components/admin/categories/CategoryTable';
import AdminPageHeader from '@/components/admin/common/AdminPageHeader';

export default function CategoriesPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);

  const [view, setView] = useState('grid');

  // GET CATEGORIES
  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get('/api/categories');

        if (data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  // EDIT
  const onEdit = (id) => {
    router.push(`/dashboard/categories/edit/${id}`);
  };

  // DELETE
  const onDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete?');

    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(`/api/categories/${id}`);

      if (data.success) {
        setCategories((prev) =>
          prev.filter((item) => item._id !== id),
        );
      }

    
    } catch (error) {
      console.log(error);
    }
  };

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
        <CategoryGrid
          categories={categories}

          onEdit={onEdit}

          onDelete={onDelete}
        />
      ) : (
        <CategoryTable
          categories={categories}

          onEdit={onEdit}

          onDelete={onDelete}
        />
      )}
    </div>
  );
}
