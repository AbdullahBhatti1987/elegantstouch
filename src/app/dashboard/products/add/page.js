'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import ProductForm from '@/components/admin/products/ProductForm';

export default function AddProductPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(
          response.data.message || 'Product added successfully',
        );

        setTimeout(() => {
          router.push('/dashboard/products');
        }, 1500);
      } else {
        toast.error(
          response.data.message || 'Product creation failed',
        );
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto">
      <ProductForm
        onSubmit={handleCreate}
        submitText="Save Product"
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
