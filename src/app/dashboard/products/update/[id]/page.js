'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import ProductDetailSkeleton from '@/components/admin/common/skeleton/ProductDetailSkeleton';
import AdminProductForm from '@/components/admin/products/AdminProductForm';

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, [id]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);

      if (data.success) {
        setProduct(data.data);
      }
    } catch (error) {
      console.log(error);

      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (payload) => {
    try {
      const { data } = await axios.put(
        `/api/products/${id}`,
        payload,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (data.success) {
        toast.success('Product updated successfully');

        router.push('/dashboard/products');
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  return (
    <AdminProductForm
      initialData={product}
      onSubmit={handleUpdate}
      submitText="Update Product"
      loading={loading}
      setLoading={setLoading}
    />
  );
}
