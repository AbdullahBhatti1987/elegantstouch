'use client';

import { useState } from 'react';

import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Elegant Pearl Hair Band',
      price: 1200,
      quantity: 2,
      image: '/products/hairband.jpg',
    },
    {
      id: 2,
      name: 'Kids Crystal Bracelet',
      price: 800,
      quantity: 1,
      image: '/products/bracelet.jpg',
    },
  ]);

  const updateQuantity = (id, type) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          quantity:
            type === 'increase'
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
        };
      }),
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart </h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList
            items={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
        </div>

        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
