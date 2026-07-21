'use client';

import axios from 'axios';
import ProductDetails from '@/components/products/ProductDetails';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
  const params = useParams();

  const id = params.id;

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);

        console.log('response ==> ', response.data);

        setProduct(response.data.data);
      } catch (error) {
        console.log('PRODUCT FETCH ERROR:', error.message);
      }
    };

    getProduct();
  }, [id]);

  if (!product) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <ProductDetails
      product={product}
      toggleWishlist={() => {}}
      addToCart={() => {}}
    />
  );
}
