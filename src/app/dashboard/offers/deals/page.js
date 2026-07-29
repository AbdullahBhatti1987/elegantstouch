'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useLoading } from '@/context/LoadingContext';

import Pagination from '@/components/admin/common/Pagination';
import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';

import DealsGrid from '@/components/admin/offers/deals/DealsGrid';
import DealsTable from '@/components/admin/offers/deals/DealsTable';

export default function DealsPage() {
  const router = useRouter();

  const [deals, setDeals] = useState([]);

  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('dealsView') || 'grid';
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

  // GET DEALS

  const getDeals = async (keyword = '', currentPage = 1) => {
    startLoading();

    try {
      const { data } = await axios.get(
        `/api/deals?search=${keyword}&page=${currentPage}&limit=${pagination.limit}`,

        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setDeals(data.data);

        setPagination(data.pagination);
      }
    } catch (error) {
      console.log('GET DEALS ERROR:', error);
    } finally {
      stopLoading();
    }
  };

  const handlePageChange = (newPage) => {
     setPagination((prev) => ({
    ...prev,
    page: newPage,
  }));

    getDeals(search, newPage);
  };

  useEffect(() => {
    getDeals();
  }, []);

  useEffect(() => {
    localStorage.setItem('dealsView', view);
  }, [view]);

  return (
    <div>
      <AdminPageHeader
        title="Deals"

        description="Manage product deals and special offers"

        searchPlaceholder="Search deals..."

        search={search}

        onChange={(value) => setSearch(value)}

        onSearch={(value) => getDeals(value)}

        addText="Add Deal"

        onAdd={() => router.push('/dashboard/offers/deals/add')}

        view={view}

        setView={setView}
      />

      {view === 'grid' ? (
        <DealsGrid
          deals={deals}

          loading={loading}
        />
      ) : (
        <DealsTable
          deals={deals}

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
