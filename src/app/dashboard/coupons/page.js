'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import Pagination from '@/components/admin/common/Pagination';

import AdminCouponGrid from '@/components/admin/coupons/AdminCouponGrid';
import AdminCouponTable from '@/components/admin/coupons/AdminCouponTable';

export default function CouponsPage() {
  const router = useRouter();

  const [coupons, setCoupons] = useState([]);

  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('couponView') || 'grid';
    }

    return 'grid';
  });

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(8);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  // GET COUPONS

  const getCoupons = async (keyword = '', currentPage = 1) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/api/coupons?search=${keyword}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setCoupons(data.data);

        setPagination(data.pagination);
      }
    } catch (error) {
      console.log('GET COUPON ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    getCoupons(search, newPage);
  };

  useEffect(() => {
    getCoupons();
  }, []);

  useEffect(() => {
    localStorage.setItem('couponView', view);
  }, [view]);

  return (
    <div>
      <AdminPageHeader
        title="Coupons"

        description="Manage discount coupons"

        searchPlaceholder="Search coupons..."

        search={search}

        onChange={(value) => setSearch(value)}

        onSearch={(value) => getCoupons(value)}

        addText="Add Coupon"

        onAdd={() => router.push('/dashboard/coupons/add')}

        view={view}

        setView={setView}
      />

      {view === 'grid' ? (
        <AdminCouponGrid coupons={coupons} loading={loading} />
      ) : (
        <AdminCouponTable coupons={coupons} loading={loading} />
      )}

      <Pagination
        pagination={pagination}

        onPageChange={handlePageChange}
      />
    </div>
  );
}
