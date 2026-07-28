'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import FlashSaleForm from '@/components/admin/offers/FlashSaleForm';
import { useLoading } from '@/context/LoadingContext';

export default function Page() {
  const router = useRouter();

  const { loading, startLoading, stopLoading } = useLoading();

  const handleCreate = async (formData) => {
    try {
      startLoading();

      const { data } = await axios.post('/api/flash-sale', formData);

      if (data.success) {
        toast.success('Flash Sale created successfully');

        router.push('/dashboard/offers/flash-sale');
      }
    } catch (error) {
      console.log('CREATE FLASH SALE ERROR:', error);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      stopLoading();
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Create Flash Sale</h1>

      <FlashSaleForm
        onSubmit={handleCreate}
        submitText="Add Flash Sale"
        loading={loading}
      />
    </div>
  );
}
