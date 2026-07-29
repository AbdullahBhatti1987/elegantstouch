'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useLoading } from '@/context/LoadingContext';
import FlashSaleForm from '@/components/admin/offers/FlashSaleForm';
import FlashSaleSkeleton from '@/components/admin/common/skeleton/detailSkeletons/FlashSaleDetailSkeleton';

export default function UpdateFlashSalePage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { loading, startLoading, stopLoading } = useLoading();
  const [flashSale, setFlashSale] = useState(null);

  // GET FLASH SALE DATA

  useEffect(() => {
    async function getFlashSale() {
      try {
        startLoading();

        const { data } = await axios.get(`/api/flash-sale/${id}`);

        if (data.success) {
          setFlashSale(data.data);
        }
      } catch (error) {
        console.log('GET FLASH SALE ERROR:', error);

        toast.error(
          error.response?.data?.message ||
            'Failed to load flash sale',
        );
      } finally {
        stopLoading();
      }
    }

    if (id) {
      getFlashSale();
    }
  }, [id]);

  // UPDATE FLASH SALE

  const handleUpdate = async (formData) => {
    try {
      startLoading();

      const { data } = await axios.put(
        `/api/flash-sale/${id}`,
        formData,
      );

      if (data.success) {
        toast.success('Flash Sale updated successfully');

        setTimeout(() => {
          router.push('/dashboard/offers/flash-sale');
        }, 1500);
      }
    } catch (error) {
      console.log('UPDATE FLASH SALE ERROR:', error);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      stopLoading();
    }
  };

  if (loading) {
    return <FlashSaleSkeleton />;
  }

  return (
    <div className="mx-auto">
      <FlashSaleForm
        initialData={flashSale}

        onSubmit={handleUpdate}

        submitText="Update Flash Sale"

        loading={loading}

        startLoading={startLoading}

        stopLoading={stopLoading}
      />
    </div>
  );
}
