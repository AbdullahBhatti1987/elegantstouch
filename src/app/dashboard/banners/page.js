'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import AdminBannerTable from '@/components/admin/banners/AdminBannerTable';
import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import Pagination from '@/components/admin/common/Pagination';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/context/LoadingContext';
import AdminBannerGrid from '@/components/admin/banners/AdminBannerGrid';

export default function BannersPage() {
  const [banners, setBanners] = useState([]);
  const router = useRouter();
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('bannerView') || 'grid';
    }

    return 'grid';
  });

  const { loading, startLoading, stopLoading } = useLoading();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 0,
  });

  // GET BANNERS
  const getBanners = async (keyword = '', currentPage = 1) => {
    startLoading();

    try {
      const { data } = await axios.get(
        `/api/banners?search=${keyword}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setBanners(data.banners);
        console.log('Banners==>', data.banners);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);

    getBanners(search, newPage);
  };

  useEffect(() => {
    getBanners();
  }, []);

  useEffect(() => {
    localStorage.setItem('bannerView', view);
  }, [view]);

  return (
    <div>
      <AdminPageHeader
        title="Banners"
        description="Manage homepage hero banners"
        searchPlaceholder="Search banners..."
        search={search}
        onChange={(value) => setSearch(value)}
        onSearch={(value) => {
          setPage(1);
          getBanners(value, 1);
        }}
        addText="Add Banner"
        onAdd={() => router.push('/dashboard/banners/add')}
        view={view}
        setView={setView}
      />

      {view === 'grid' ? (
        <AdminBannerGrid banners={banners} loading={loading} />
      ) : (
        <AdminBannerTable banners={banners} loading={loading} />
      )}

      <Pagination
        pagination={pagination}

        onPageChange={handlePageChange}
      />
    </div>
  );
}
