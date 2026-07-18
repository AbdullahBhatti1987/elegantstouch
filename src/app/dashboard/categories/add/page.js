'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import CategoryForm from '@/components/admin/categories/CategoryForm';

export default function AddCategoryPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Category added successfully');

        setTimeout(() => {
          router.push('/dashboard/categories');
        }, 2000);
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
      <CategoryForm
        onSubmit={handleCreate}
        submitText="Save Category"
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
