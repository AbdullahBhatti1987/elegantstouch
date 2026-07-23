'use client';

import { useCart } from '@/context/CartContext';

import CartList from '@/components/cart/CartList';
import CartSummary from '@/components/cart/CartSummary';
import EmptyCart from '@/components/cart/EmptyCart';
import CartSkeleton from '@/components/cart/CartSkeleton';

export default function CartPage() {
  const { cart, initialLoading, updateCartQuantity, removeFromCart } =
    useCart();

  // Show Skeleton While Fetching Cart
  if (initialLoading) {
    return <CartSkeleton />;
  }

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

  // Show Empty Cart Only After Loading Finished
  if (!cart || cartItems.length === 0) {
    return <EmptyCart />;
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleUpdateQuantity = (id, type) => {
    const item = cart.items.find((item) => item.productId._id === id);

    if (!item) return;

    const newQuantity =
      type === 'increase'
        ? item.quantity + 1
        : Math.max(1, item.quantity - 1);

    updateCartQuantity(id, newQuantity);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartList
            items={cartItems}
            updateQuantity={handleUpdateQuantity}
            removeItem={removeFromCart}
          />
        </div>

        <CartSummary subtotal={subtotal} />
      </div>
    </div>
  );
}
