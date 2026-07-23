'use client';

import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function CouponForm({
  subtotal,
  setDiscount,
  setCoupon,
}) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

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
        setDiscount(res.data.data.discount);

        setCoupon(res.data.data.code);

        toast.success('Coupon applied successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon');

      setDiscount(0);
      setCoupon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <div className="flex gap-2">
        <input
          type="text"

          placeholder="Coupon code"

          value={code}

          onChange={(e) => setCode(e.target.value)}

          className="flex-1 rounded-lg border px-3 py-2 outline-none"
        />

        <button
          onClick={handleApply}

          disabled={loading}

          className="bg-primary rounded-lg px-4 text-white"
        >
          {loading ? 'Applying...' : 'Apply'}
        </button>
      </div>
    </div>
  );
}
