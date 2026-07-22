'use client';

import ProductCard from '@/components/products/ProductCard';

export default function WishlistGrid({
  items,
  onRemove,
  onAddToCart,
  isInWishlist,
  isInCart,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => {
        const product = item.productId;

        return (
          <ProductCard
            key={product._id}

            product={product}

            showWishlistButton={true}

            removeFromWishlist={onRemove}

            isInWishlist={isInWishlist(product._id)}

            addToCart={onAddToCart}

            isInCart={isInCart(product._id)}

            showCartButton={true}

            showRating={true}

            onClick={() => router.push(`/products/${product.slug}`)}
          />
        );
      })}
    </div>
  );
}
