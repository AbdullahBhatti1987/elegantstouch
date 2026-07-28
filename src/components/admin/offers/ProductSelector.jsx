'use client';

import { useEffect, useState } from 'react';

export default function ProductSelector({ selected, setSelected }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch('/api/products');

      const data = await res.json();

      setProducts(data.data || []);
    }

    load();
  }, []);

  function toggle(id) {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {products.map((product) => (
        <div
          key={product._id}

          onClick={() => toggle(product._id)}

          className={`cursor-pointer rounded-xl border p-3 transition ${
            selected.includes(product._id)
              ? 'border-rose-500 bg-rose-50'
              : 'border-gray-200'
          } `}
        >
          <img
            src={
              product.images?.[0]?.thumbnail ||
              product.images?.[0]?.url
            }

            className="h-20 w-full rounded-lg object-cover"
          />

          <p className="mt-2 text-xs font-semibold">{product.name}</p>
        </div>
      ))}
    </div>
  );
}
