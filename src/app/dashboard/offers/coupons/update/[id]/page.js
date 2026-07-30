'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import CouponForm from '@/components/admin/coupons/CouponForm';
import { useLoading } from '@/context/LoadingContext';

export default function UpdateCouponPage() {
  const params = useParams();

  const id = params?.id;

  const router = useRouter();

  const { loading, startLoading, stopLoading } = useLoading();

  const [coupon, setCoupon] = useState(null);

  // GET COUPON DATA

  useEffect(() => {
    async function getCoupon() {
      try {
        startLoading();

        const { data } = await axios.get(`/api/coupons/${id}`);

        if (data.success) {
          setCoupon(data.data);
        }
      } catch (error) {
        console.log(error);

        toast.error(
          error.response?.data?.message || 'Failed to load coupon',
        );
      } finally {
        stopLoading();
      }
    }

    if (id) {
      getCoupon();
    }
  }, [id]);

  // UPDATE COUPON

  const handleUpdate = async (formData) => {
    try {
      startLoading();

      const { data } = await axios.put(
        `/api/coupons/${id}`,

        formData,
      );

      if (data.success) {
        toast.success('Coupon updated successfully');

        setTimeout(() => {
          router.push(`/dashboard/offers/coupons/${id}`);
        }, 1500);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      stopLoading();
    }
  };

  if (!coupon) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto">
      <CouponForm
        initialData={coupon}

        onSubmit={handleUpdate}

        submitText="Update Coupon"

        loading={loading}

        startLoading={startLoading}

        stopLoading={stopLoading}
      />
    </div>
  );
}
