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
  const { params } = useParams();
  
  console.log("params==>", params )
  const { startLoading, stopLoading } = useLoading();

  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  // GET SINGLE BANNER

  const getBanner = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/api/banners/${id}`);

      if (data.success) {
        setBanner(data.banner || data.data);
      }
    } catch (error) {
      console.log(error);

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

  // UPDATE BANNER

  const handleUpdate = async (formData) => {
    try {
      startLoading();

      const response = await axios.put(
        `/api/banners/${params.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.data.success) {
        toast.success('Banner updated successfully');

        setTimeout(() => {
          router.push('/dashboard/banners');
        }, 1500);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          'Update failed',
      );
    } finally {
      stopLoading();
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!banner) {
    return (
      <div className="p-10 text-center text-gray-500">
        Banner not found
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <BannerForm
        initialData={banner}
        onSubmit={handleUpdate}
        submitText="Update Banner"
      />
    </div>
  );
}
