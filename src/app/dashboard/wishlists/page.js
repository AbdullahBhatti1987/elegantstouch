'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';



import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import Pagination from '@/components/admin/common/Pagination';
import AdminWishlistGrid from '@/components/admin/wishlists/AdminWishlistGrid';
import AdminWishlistTable from '@/components/admin/wishlists/AdminWishlistTable';

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState([]);

  const [view, setView] = useState('grid');

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');





  const [pagination, setPagination] = useState({
    page: 1,

    limit: 8,

    total: 0,

    totalPages: 0,
  });

  // SAVE VIEW

  useEffect(() => {
    const savedView = localStorage.getItem('wishlistView');

    if (savedView) {
      setView(savedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistView', view);
  }, [view]);

  // GET WISHLISTS

  const getWishlists = async (keyword = '', currentPage = 1) => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/wishlists?search=${keyword}&page=${currentPage}&limit=${pagination.limit}`,

        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setWishlists(data.data);

        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
     setPagination((prev) => ({
    ...prev,
    page: newPage,
  }));

    getWishlists(search, newPage);
  };

  useEffect(() => {
    getWishlists();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Wishlists"

        description="Manage customer wishlists"

        searchPlaceholder="Search wishlists..."

        search={search}

        onChange={(value) => setSearch(value)}

        onSearch={(value) => getWishlists(value)}

        addText={null}

        view={view}

        setView={setView}
      />

      {view === 'grid' ? (
        <AdminWishlistGrid
          wishlists={wishlists}

          loading={loading}
        />
      ) : (
        <AdminWishlistTable
          wishlists={wishlists}

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
