'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductSelector({
  category,
  selectedProducts,
  setSelectedProducts,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!category) {
      setProducts([]);

      return;
    }

    async function fetchProducts() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `/api/products?category=${category}`,
        );

        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.log('Product Fetch Error', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category]);

  const toggleProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((item) => item !== id),
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div>
      {loading && (
        <p className="text-sm text-gray-500">Loading products...</p>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}

            onClick={() => toggleProduct(product._id)}

            className={`cursor-pointer rounded-xl border p-3 transition ${
              selectedProducts.includes(product._id)
                ? 'border-rose-500 bg-rose-50 dark:bg-rose-950'
                : 'border-gray-200 dark:border-neutral-700'
            } `}
          >
            <img
              src={
                product.images?.[0]?.thumbnail ||
                product.images?.[0]?.url
              }

              alt={product.name}

              className="h-28 w-full rounded-lg object-cover"
            />

            <input
              type="checkbox"

              checked={selectedProducts.includes(product._id)}

              onChange={() => toggleProduct(product._id)}

              className="mt-2"
            />

            <p className="mt-2 line-clamp-1 text-xs font-semibold">
              {product.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
