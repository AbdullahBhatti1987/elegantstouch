'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AdminCartGrid from '@/components/admin/carts/AdminCartGrid';
import AdminCartTable from '@/components/admin/carts/AdminCartTable';
import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import Pagination from '@/components/admin/common/Pagination';

export default function CartsPage() {
  const router = useRouter();

  const [carts, setCarts] = useState([]);

  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cartView') || 'grid';
    }

    return 'grid';
  });

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [pagination, setPagination] = useState({});

  // GET CARTS
  const getCarts = async (keyword = '', currentPage = 1) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/api/carts?search=${keyword}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setCarts(data.data);
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

    getCarts(search, newPage);
  };

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartView', view);
  }, [view]);

  return (
    <div>
      <AdminPageHeader
        title="Carts"
        description="Manage customer shopping carts"
        searchPlaceholder="Search carts..."
        search={search}
        onChange={(value) => setSearch(value)}
        onSearch={(value) => getCarts(value)}
        addText={null}
        view={view}
        setView={setView}
      />

      {view === 'grid' ? (
        <AdminCartGrid carts={carts} loading={loading} />
      ) : (
        <AdminCartTable carts={carts} loading={loading} />
      )}

      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
