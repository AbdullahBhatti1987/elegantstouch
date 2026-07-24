'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLoading } from '@/context/LoadingContext';
import AdminCategoryForm from '@/components/admin/categories/AdminCategoryForm';
import CategoryDetailSkeleton from '@/components/admin/common/skeleton/CategoryDetailSkeleton';
import { useLoading } from '@/context/LoadingContext';

export default function EditCategoryPage() {
  const { id } = useParams();

  const router = useRouter();

  const [category, setCategory] = useState(null);

  const { loading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    getCategory();
  }, [id]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`/api/categories/${id}`);

      if (data.success) {
        setCategory(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load category');
    } finally {
      stopLoading();
    }
  };

  const handleUpdate = async (payload) => {
    try {
      const { data } = await axios.put(
        `/api/categories/${id}`,
        payload,
      );

      if (data.success) {
        toast.success('Category updated');

        router.push('/dashboard/categories');
      }
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || 'Update failed');
    }
  };


  if (loading) {
    return <CategoryDetailSkeleton />;
  }

  return (
    <AdminCategoryForm
      initialData={category}
      onSubmit={handleUpdate}
      submitText="Update Category"
      loading={loading}
    />
  );
}
