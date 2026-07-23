'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CouponInput({
  subtotal,
  setDiscount,
  setCoupon,
  loading,
  setLoading,
}) {
  const [code, setCode] = useState('');

  const handleApply = async () => {
    if (!code.trim()) {
      toast.error('Enter coupon code');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post('/api/coupons/apply', {
        code,
        subtotal,
      });

      if (res.data.success) {
        setDiscount(Math.round(res.data.data.discount));

        setCoupon(res.data.data.code);

        toast.success('Coupon applied successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Coupon failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter Coupon Code"
        className="focus:ring-primary w-full rounded-xl border px-4 py-3 outline-none focus:ring-2"
      />

      <button
        type="button"
        onClick={handleApply}
        disabled={loading}
        className="bg-primary w-full rounded-xl px-4 py-3 text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {loading ? 'Applying...' : 'Apply Coupon'}
      </button>
    </div>
  );
}
