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

  useEffect(() => {
    fetchProducts();
  }, []);

  const onEdit = (product) => {
    console.log('Edit Product:', product);
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);

      // refresh list after delete
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading products...</div>;
  }

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
        <ProductGrid
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ) : (
        <ProductTable
          products={products}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
