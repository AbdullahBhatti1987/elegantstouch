'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const guestId = localStorage.getItem('guestId');

      if (!guestId) {
        setCartItems([]);

        return;
      }

      const { data } = await axios.get(`/api/cart/${guestId}`);

      if (data.success) {
        const items = data.data.items.map((item) => ({
          id: item.productId._id,

          name: item.productId.name,

          price: item.productId.salePrice || item.productId.price,

          quantity: item.quantity,

          image:
            item.productId.images?.[0]?.thumbnail ||
            '/images/placeholder.jpg',
        }));

        setCartItems(items);
      }
    } catch (error) {
      console.log('FETCH CART ERROR', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, type) => {
    try {
      const guestId = localStorage.getItem('guestId');

      if (!guestId) return;

      // UI ke liye new quantity calculate
      const updatedItems = cartItems.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity:
            type === 'increase'
              ? item.quantity + 1
              : Math.max(1, item.quantity - 1),
        };
      });

      // UI update
      setCartItems(updatedItems);

      // API payload
      const payload = {
        items: updatedItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      };

      await axios.put(`/api/cart/${guestId}`, payload);
    } catch (error) {
      console.log('UPDATE CART ERROR:', error.message);
    }
  };

  const removeItem = async (id) => {
    try {
      const guestId = localStorage.getItem('guestId');

      if (!guestId) return;

      // UI se remove
      const updatedItems = cartItems.filter((item) => item.id !== id);

      setCartItems(updatedItems);

      // agar cart empty ho jaye
      // to complete cart delete
      if (updatedItems.length === 0) {
        await axios.delete(`/api/cart/${guestId}`);

        return;
      }

      // warna remaining items update
      await axios.put(`/api/cart/${guestId}`, {
        items: updatedItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      });
    } catch (error) {
      console.log('REMOVE CART ERROR:', error.message);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (loading) {
    return <div className="py-20 text-center">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

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
