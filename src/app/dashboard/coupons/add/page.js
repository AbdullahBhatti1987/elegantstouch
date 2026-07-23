'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import CouponForm from '@/components/admin/coupons/CouponForm';


export default function AddCouponPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    try {
      setLoading(true);

      const { data } = await axios.post('/api/coupons', formData);

      if (data.success) {
        toast.success('Coupon created successfully');

        setTimeout(() => {
          router.push('/dashboard/coupons');
        }, 1500);
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
      <CouponForm
        onSubmit={handleCreate}
        submitText="Save Coupon"
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
