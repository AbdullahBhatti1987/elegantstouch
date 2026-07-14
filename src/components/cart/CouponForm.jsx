'use client';

export default function CouponForm() {
  return (
    <div className="space-y-3">
      <input
        type="text"
        placeholder="Coupon Code"
        className="w-full rounded-lg border px-4 py-3 outline-none"
      />
      <button className="bg-primary w-full rounded-lg py-3 text-white">
        Apply Coupon
      </button>
    </div>
  );
}
