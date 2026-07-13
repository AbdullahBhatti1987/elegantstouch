'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import CategoryForm from '@/components/admin/categories/CategoryForm';

export default function EditCategoryPage() {
  const { id } = useParams();

  const router = useRouter();

  const [category, setCategory] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategory();
  }, [id]);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/categories/${id}`
      );

      if (data.success) {
        setCategory(data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to load category');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (payload) => {
    try {
      const { data } = await axios.put(
        `/api/categories/${id}`,
        payload
      );

      if (data.success) {
        toast.success('Category updated');

        router.push('/dashboard/categories');
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          'Update failed'
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <CategoryForm
      initialData={category}
      onSubmit={handleUpdate}
      submitText="Update Category"
    />
  );
}