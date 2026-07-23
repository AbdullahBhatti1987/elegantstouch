'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import AdminPageHeader from '@/components/admin/common/header/AdminPageHeader';
import ProductGrid from '@/components/admin/products/ProductGrid';
import ProductTable from '@/components/admin/products/ProductTable';
import { useRouter } from 'next/navigation';
import Pagination from '@/components/admin/common/Pagination';

export default function ProductsPage() {
  const [view, setView] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('categoryView') || 'grid';
    }

    return 'grid';
  });
  const [products, setProducts] = useState([]);

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

  const router = useRouter();

  // const fetchProducts = async () => {
  //   try {
  //     const response = await axios.get('/api/products');

  //     if (response.data.success) {
  //       setProducts(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log('Products fetch error:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const getProducts = async (keyword = '', currentPage = 1) => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `/api/products?search=${keyword}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
          },
        },
      );

      if (data.success) {
        setProducts(data.data);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Get saved view
  useEffect(() => {
    const savedView = localStorage.getItem('productsView');

    if (savedView) {
      setView(savedView);
    }
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);

    getProducts(search, newPage);
  };

  // Save view whenever changes
  useEffect(() => {
    localStorage.setItem('productsView', view);
  }, [view]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage your store products"
        searchPlaceholder="Search products..."
        addText="Add Product"
        search={search}
        onChange={(value) => setSearch(value)}
        onSearch={(value) => getProudcts(value)}
        view={view}
        setView={setView}
        onAdd={() => router.push('/dashboard/products/add')}
      />

      {view === 'grid' ? (
        <ProductGrid products={products} loading={loading} />
      ) : (
        <ProductTable products={products} loading={loading} />
      )}

      <Pagination
        pagination={pagination}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
