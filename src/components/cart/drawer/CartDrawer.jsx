'use client';

import { X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import CartList from '../CartList';
import CartSummary from '../CartSummary';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
  const {
    cart,
    cartDrawerOpen,
    setCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
  } = useCart();

  const [showDrawer, setShowDrawer] = useState(false);
  const [animateDrawer, setAnimateDrawer] = useState(false);

  useEffect(() => {
    if (cartDrawerOpen) {
      setShowDrawer(true);
      setAnimateDrawer(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimateDrawer(true);
        });
      });
    } else {
      setAnimateDrawer(false);

      const timer = setTimeout(() => {
        setShowDrawer(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [cartDrawerOpen]);

  if (!showDrawer) return null;

  const cartItems =
    cart?.items?.map((item) => ({
      id: item.productId._id,
      name: item.productId.name,
      category: item.productId.categoryId?.name || 'Category',
      price: item.productId.salePrice || item.productId.price,
      originalPrice: item.productId.price,
      quantity: item.quantity,
      image: item.productId.images?.[0]?.thumbnail,
    })) || [];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (id, type) => {
    const item = cart.items.find((item) => item.productId._id === id);

    if (!item) return;

    const quantity =
      type === 'increase'
        ? item.quantity + 1
        : Math.max(1, item.quantity - 1);

    updateCartQuantity(id, quantity);
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}

      {/* Click outside */}
      <div
        onClick={() => setCartDrawerOpen(false)}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${animateDrawer ? 'opacity-100' : 'opacity-0'} `}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 z-10 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 dark:bg-zinc-900 ${animateDrawer ? 'translate-x-0' : 'translate-x-full'} `}
      >
        {/* Drawer */}

        <div
          className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out dark:bg-zinc-900 ${
            animateDrawer ? 'translate-x-0' : 'translate-x-full'
          } `}
        >
          {/* Header */}

          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-xl font-bold">Shopping Cart</h2>

            <button
              onClick={() => setCartDrawerOpen(false)}
              aria-label="Close cart"
            >
              <X />
            </button>
          </div>

          {/* Content */}

          <div className="flex-1 overflow-y-auto p-4">
            <CartList
              items={cartItems}
              updateQuantity={handleUpdateQuantity}
              removeItem={removeFromCart}
            />

            <div className="mt-6 border-t pt-4">
              <CartSummary
                subtotal={subtotal}
                setCartDrawerOpen={setCartDrawerOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
