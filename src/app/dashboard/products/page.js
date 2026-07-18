'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import AdminPageHeader from '@/components/admin/common/AdminPageHeader';
import ProductGrid from '@/components/admin/products/ProductGrid';
import ProductTable from '@/components/admin/products/ProductTable';
import { useRouter } from 'next/navigation';

export default function ProductsPage() {
  const [view, setView] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');

      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.log('Products fetch error:', error);
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

  // Save view whenever changes
  useEffect(() => {
    localStorage.setItem('productsView', view);
  }, [view]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <AdminPageHeader
        title="Products"
        description="Manage your store products"
        searchPlaceholder="Search products..."
        addText="Add Product"
        view={view}
        setView={setView}
        onAdd={() => router.push('/dashboard/products/add')}
      />

      {view === 'grid' ? (
        <ProductGrid products={products} loading={loading} />
      ) : (
        <ProductTable products={products} loading={loading} />
      )}
    </div>
  );
}
