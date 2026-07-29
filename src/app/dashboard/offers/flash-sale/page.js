'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useLoading } from '@/context/LoadingContext';

import Pagination from '@/components/admin/common/Pagination';
import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import FlashSaleGrid from '@/components/admin/offers/flash-sale/FlashSaleGrid';
import FlashSaleTable from '@/components/admin/offers/flash-sale/FlashSaleTable';

export default function FlashSalePage() {
  const router = useRouter();

  const [flashSales, setFlashSales] = useState([]);

  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('flashSaleView') || 'grid';
    }

    return 'grid';
  });

  const { loading, startLoading, stopLoading } = useLoading();

  const [search, setSearch] = useState('');





  const [pagination, setPagination] = useState({
    page: 1,

    limit: 8,

    total: 0,

    totalPages: 0,
  });

  // GET FLASH SALES

  const getFlashSales = async (keyword = '', currentPage = 1) => {
    startLoading();

    try {
      startLoading();
      const { data } = await axios.get(
        `/api/flash-sale?search=${keyword}&page=${currentPage}&limit=${pagination.limit}`,

        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setFlashSales(data.data);

        setPagination(data.pagination);
      }
    } catch (error) {
      console.log('GET FLASH SALE ERROR:', error);
    } finally {
      stopLoading();
    }
  };

  const handlePageChange = (newPage) => {
     setPagination((prev) => ({
    ...prev,
    page: newPage,
  }));

    getFlashSales(search, newPage);
  };

  useEffect(() => {
    getFlashSales();
  }, []);

  useEffect(() => {
    localStorage.setItem('flashSaleView', view);
  }, [view]);

  return (
    <div>
      <AdminPageHeader
        title="Flash Sale"
        description="Manage limited time offers and sale products"
        searchPlaceholder="Search flash sales..."
        search={search}
        onChange={(value) => setSearch(value)}
        onSearch={(value) => getFlashSales(value)}
        addText="Add Flash Sale"
        onAdd={() => router.push('/dashboard/offers/flash-sale/add')}
        view={view}
        loading={loading}
        setView={setView}
      />

      {view === 'grid' ? (
        <FlashSaleGrid
          flashSales={flashSales}
          router={router}
          loading={loading}
        />
      ) : (
        <FlashSaleTable
          flashSales={flashSales}

          router={router}
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
