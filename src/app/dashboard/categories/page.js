'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AdminCategoryGrid from '@/components/admin/categories/AdminCategoryGrid';
import AdminCategoryTable from '@/components/admin/categories/AdminCategoryTable';
import AdminPageHeader from '@/components/admin/common/AdminPageHeader';
import Pagination from '@/components/admin/common/Pagination';

export default function CategoriesPage() {
  const router = useRouter();

  const [categories, setCategories] = useState([]);
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('categoryView') || 'grid';
    }

    return 'grid';
  });
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(4);

  const [pagination, setPagination] = useState({});

  // GET CATEGORIES
  // const getCategories = async (
  //   keyword = search,
  //   currentPage = page,
  // ) => {
  //   setLoading(true);

  //   try {
  //     const { data } = await axios.get(
  //       `/api/categories?search=${keyword}&page=${currentPage}&limit=${limit}`,
  //     );

  //     if (data.success) {
  //       setCategories(data.data);
  //       setPagination(data.pagination);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 500);
  //   }
  // };

  const getCategories = async (keyword = '', currentPage = 1) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/api/categories?search=${keyword}&page=${currentPage}&limit=${limit}`,
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

  const handlePageChange = (newPage) => {
    setPage(newPage);

    getCategories(search, newPage);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    localStorage.setItem('categoryView', view);
  }, [view]);

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
        />
      ) : (
        <AdminCategoryTable
          categories={categories}

          loading={loading}
        />
      )}
      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
