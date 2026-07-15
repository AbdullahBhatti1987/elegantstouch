'use client';

import { useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import CategoryForm from '@/components/admin/categories/CategoryForm';

const initialForm = {
  name: '',
  slug: '',
  alt: '',
  description: '',
  keywords: '',
  status: 'active',
  featured: false,
  sortOrder: '',
  seoTitle: '',
  seoDescription: '',
};

export default function AddCategoryPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    try {
      setLoading(true);

      const response = await axios.post('/api/categories', payload);

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
      {/* Header */}

      <CategoryForm
        onSubmit={handleCreate}
        submitText="Save Category"
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
