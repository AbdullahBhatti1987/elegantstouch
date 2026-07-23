'use client';

import { useState } from 'react';

export default function EasypaisaCheckout() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/easypaisa/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: '100.00', // Amount with up to 2 decimal places
          orderRefNum: `ORD-${Date.now()}`, // Unique order reference
        }),
      });

      const data = await response.json();
      if (!data.success) throw new Error(data.message);

      // Dynamically create a form and submit it to Easypaisa gateway
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = data.easypayURL;
      form.target = '_self';

      for (const key in data.params) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = data.params[key];
        form.appendChild(input);
      }

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error('Payment Error:', err);
      alert('Could not initiate payment.');
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="rounded-lg bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
    >
      {loading ? 'Processing...' : 'Pay with Easypaisa'}
    </button>
  );
}
