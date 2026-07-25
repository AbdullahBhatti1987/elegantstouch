'use client';

import { useState } from 'react';

import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

import WishlistActions from '@/components/wishlist/WishlistActions';
import WishlistFilters from '@/components/wishlist/WishlistFilters';
import WishlistGrid from '@/components/wishlist/WishlistGrid';
import EmptyWishlist from '@/components/wishlist/EmptyWishlist';

export default function WishlistPage() {
  const {
    wishlist,
    wishlistCount,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart, isInCart } = useCart();

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  // Wishlist items

  // const wishlistItems =
  //   wishlist?.items?.filter((item) => {
  //     const productId = item.productId?._id;

  //     return productId && !isInCart(productId);
  //   }) || [];

  const wishlistItems =
    wishlist?.items?.filter((item) => item.productId?._id) || [];

  // Move All Wishlist To Cart

  const moveAllToCart = async () => {
    for (const item of wishlistItems) {
      if (item.productId) {
        await addToCart(item.productId, 1);
      }
    }

    // optional:
    clearWishlist();
  };

  // Filter Logic

  let filteredItems = [...wishlistItems];

  if (filter === 'inStock') {
    filteredItems = filteredItems.filter(
      (item) => item.productId?.stock > 0,
    );
  }

  if (filter === 'outOfStock') {
    filteredItems = filteredItems.filter(
      (item) => item.productId?.stock <= 0,
    );
  }

  // Sort Logic

  if (sort === 'low') {
    filteredItems.sort(
      (a, b) => a.productId.price - b.productId.price,
    );
  }

  if (sort === 'high') {
    filteredItems.sort(
      (a, b) => b.productId.price - a.productId.price,
    );
  }

  if (sort === 'name') {
    filteredItems.sort((a, b) =>
      a.productId.name.localeCompare(b.productId.name),
    );
  }

  if (!wishlistItems.length) {
    return <EmptyWishlist />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <WishlistActions
        totalItems={wishlistCount}
        items={wishlistItems}
        onMoveAll={moveAllToCart}
      />

      <WishlistFilters
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
      />

      <WishlistGrid
        items={filteredItems}

        onRemove={removeFromWishlist}

        onAddToCart={addToCart}

        isInWishlist={isInWishlist}

        isInCart={isInCart}
      />
    </div>
  );
}
