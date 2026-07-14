'use client';

import { useState } from 'react';

import WishlistGrid from '@/components/wishlist/WishlistGrid';
import WishlistActions from '@/components/wishlist/WishlistActions';
import WishlistFilters from '@/components/wishlist/WishlistFilters';
import EmptyWishlist from '@/components/wishlist/EmptyWishlist';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      slug: 'pearl-hair-band',
      name: 'Elegant Pearl Hair Band',
      price: 1200,
      oldPrice: 1500,
      image: '/products/hairband.jpg',
      inStock: true,
    },
    {
      id: 2,
      slug: 'crystal-kids-bracelet',
      name: 'Kids Crystal Bracelet',
      price: 800,
      oldPrice: 1000,
      image: '/products/bracelet.jpg',
      inStock: true,
    },
    {
      id: 3,
      slug: 'princess-hair-clips',
      name: 'Princess Style Hair Clips Set',
      price: 650,
      oldPrice: 900,
      image: '/products/hair-clips.jpg',
      inStock: true,
    },
    {
      id: 4,
      slug: 'baby-flower-hair-band',
      name: 'Baby Flower Soft Hair Band',
      price: 450,
      oldPrice: 600,
      image: '/products/flower-band.jpg',
      inStock: true,
    },
    {
      id: 5,
      slug: 'kids-butterfly-jewellery-set',
      name: 'Butterfly Jewellery Set For Girls',
      price: 1800,
      oldPrice: 2200,
      image: '/products/jewellery-set.jpg',
      inStock: false,
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  // Remove wishlist item
  const removeWishlist = (id) => {
    setWishlistItems((items) =>
      items.filter((item) => item.id !== id),
    );
  };

  // Add single item to cart
  const addToCart = (product) => {
    console.log('Add to cart:', product);

    // Future:
    // axios.post('/api/cart', product)
  };

  // Move all wishlist to cart
  const moveAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item);
    });

    setWishlistItems([]);

    console.log('All wishlist moved to cart');
  };

  // Filter Logic
  let filteredItems = [...wishlistItems];

  if (filter === 'inStock') {
    filteredItems = filteredItems.filter((item) => item.inStock);
  }

  if (filter === 'outOfStock') {
    filteredItems = filteredItems.filter((item) => !item.inStock);
  }

  // Sort Logic
  if (sort === 'low') {
    filteredItems.sort((a, b) => a.price - b.price);
  }

  if (sort === 'high') {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  if (sort === 'name') {
    filteredItems.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (filteredItems.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <WishlistActions
        totalItems={wishlistItems.length}
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
        onRemove={removeWishlist}
        onAddToCart={addToCart}
      />
    </div>
  );
}
