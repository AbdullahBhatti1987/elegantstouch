'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import BannerForm from '@/components/admin/banners/BannerForm';
import PageLoader from '@/components/admin/common/loaders/PageLoader';
import { useLoading } from '@/context/LoadingContext';

export default function UpdateBannerPage() {
  const router = useRouter();
  const { id } = useParams();

  const { startLoading, stopLoading } = useLoading();

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBanner = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/banners/${id}`);

      if (data.success) {
        setBanner(data.data);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to load banner',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getBanner();
    }
  }, [id]);

  const handleUpdate = async (formData) => {
    try {
      startLoading();

      const { data } = await axios.put(
        `/api/banners/${id}`,
        formData,
      );

      if (data.success) {
        toast.success('Banner updated successfully');

        setTimeout(() => {
          router.push('/dashboard/banners');
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      stopLoading();
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!banner) {
    return <div className="p-10 text-center">Banner not found</div>;
  }

  return (
    <BannerForm
      initialData={banner}

      onSubmit={handleUpdate}

      submitText="Update Banner"
    />
  );
}
