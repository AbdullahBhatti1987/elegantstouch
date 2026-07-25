'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import BannerForm from '@/components/admin/banners/BannerForm';
import { useLoading } from '@/context/LoadingContext';

export default function AddBannerPage() {
  const router = useRouter();

  const { startLoading, stopLoading } = useLoading();

  const handleCreate = async (formData) => {
    try {
      startLoading();

      const response = await axios.post('/api/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Banner added successfully');

        setTimeout(() => {
          router.push('/dashboard/banners');
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
      stopLoading();
    }
  };

  return (
    <div className="mx-auto">
      <BannerForm
        onSubmit={handleCreate}
        submitText="Save Banner"
      />
    </div>
  );
}
