'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AdminCategoryGrid from '@/components/admin/categories/AdminCategoryGrid';
import AdminCategoryTable from '@/components/admin/categories/AdminCategoryTable';
import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import Pagination from '@/components/admin/common/Pagination';

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);

  const [view, setView] = useState('grid');

  useEffect(() => {
    const savedView = localStorage.getItem('categoryView');

    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('categoryView', view);
  }, [view]);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');


  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  const getCategories = async (keyword = '', currentPage = 1) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/categories?search=${keyword}&page=${currentPage}&limit=${pagination.limit}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setCategories(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [counts, setCounts] = useState({
    categories: 0,
    products: 0,
    carts: 0,
    // orders: 0,
    categoryWiseProducts: [],
  });

  async function getCounts() {
    try {
      const { data } = await axios.get('/api/dashboard/status');

      if (data.success) {
        setCounts(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handlePageChange = (newPage) => {
     setPagination((prev) => ({
    ...prev,
    page: newPage,
  }));
    getCategories(search, newPage);
  };

  useEffect(() => {
    getCounts();
    getCategories();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Categories"
        description="Manage your store categories"
        searchPlaceholder="Search categories..."
        search={search}
        onChange={(value) => setSearch(value)}
        onSearch={(value) => getCategories(value)}
        addText="Add Category"
        onAdd={() => router.push('/dashboard/categories/add')}
        view={view}
        setView={setView}
      />
      {view === 'grid' ? (
        <AdminCategoryGrid
          categories={categories}
          loading={loading}
          counts={counts}
        />
      ) : (
        <AdminCategoryTable
          categories={categories}
          loading={loading}
          view={view}
        />
      )}
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
