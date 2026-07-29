'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Heart, ShoppingCart, Minus, Plus, Star } from 'lucide-react';
import { useMemo } from 'react';
import { Info } from '../admin/common/form/Info';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductDetails({ product }) {
  const { addToCart, isInCart, updateCartQuantity } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } =
    useWishlist();
  const images = product?.images || [];

  const [activeImage, setActiveImage] = useState(
    images[0]?.url || '/images/placeholder.jpg',
  );

  const productInCart = isInCart(product._id);
  const productInWishlist = useMemo(
    () => isInWishlist(product._id),
    [wishlist, product._id],
  );

  const [quantity, setQuantity] = useState(
    productInCart?.quantity || 1,
  );

  const changeQuantity = async (value) => {
    const newQty = quantity + value;

    if (newQty < 1) return;

    if (newQty > product.stock) return;

    setQuantity(newQty);

    // cart me already hai to update karo

    if (productInCart) {
      await updateCartQuantity(product._id, newQty);
    }
  };

  const handleAddToCart = async () => {
    if (productInCart) return;

    await addToCart(product, quantity);
  };

  return (
    <section className="mx-auto max-w-6xl px-3 py-6 sm:px-5 lg:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-2">
        {/* IMAGE SECTION */}

        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          {/* THUMBNAILS */}

          <div className="flex gap-2 overflow-x-auto sm:flex-col sm:overflow-visible">
            {images.slice(0, 5).map((img, index) => (
              <button
                key={index}

                onClick={() => setActiveImage(img.url)}

                className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border sm:h-20 sm:w-20 ${
                  activeImage === img.url
                    ? 'border-black'
                    : 'border-gray-200'
                }`}
              >
                <Image
                  src={img.thumbnail || img.url}
                  alt={product.name}
                  fill
                  
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          {/* MAIN IMAGE */}

          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-100 sm:max-w-md">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              priority
              sizes="(max-width:640px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}

        <div className="space-y-4">
          <p className="text-xs tracking-widest text-gray-400 uppercase sm:text-sm">
            {product.brand}
          </p>

          <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">
            {product.name}
          </h1>

          {/* RATING */}

          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-yellow-400">
              {Array.from({
                length: 5,
              }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < 4 ? 'currentColor' : 'none'}
                />
              ))}
            </div>

            <span className="text-sm text-gray-500">
              4.8 (120 reviews)
            </span>
          </div>

          {/* PRICE */}

          <div>
            {product.salePrice ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-2xl font-bold text-pink-600">
                  Rs {product.salePrice}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  Rs {product.price}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold">
                Rs {product.price}
              </span>
            )}
          </div>

          {/* STOCK */}

          <span
            className={`inline-block rounded-full px-3 py-1 text-xs ${
              product.stock > 0
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {product.stock > 0 ? 'In Stock' : 'Out Of Stock'}
          </span>

          {/* DESCRIPTION */}

          <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
            {product.description}
          </p>

          {/* INFO */}

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Info title="Material" value={product.material} />

            <Info title="Color" value={product.color} />

            <Info title="Age Group" value={product.ageGroup} />

            <Info title="Weight" value={product.weight} />
          </div>

          {/* ACTIONS */}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* QUANTITY */}

            <div className="flex h-12 items-center justify-center rounded-xl border">
              <button
                onClick={() => changeQuantity(-1)}

                className="p-3"
              >
                <Minus size={17} />
              </button>

              <span className="w-10 text-center">{quantity}</span>

              <button
                onClick={() => changeQuantity(1)}

                className="p-3"
              >
                <Plus size={17} />
              </button>
            </div>

            {/* WISHLIST */}

            <button
              onClick={(e) => {
                e.stopPropagation();

                const exists = isInWishlist(product._id);

                if (exists) {
                  removeFromWishlist(product._id);
                } else {
                  addToWishlist(product);
                }
              }}

              className="flex h-12 w-full items-center justify-center rounded-xl border sm:w-12"
            >
              <Heart
                size={22}
                className={
                  productInWishlist
                    ? 'fill-primary text-primary'
                    : 'text-gray-600'
                }
              />
            </button>

            {/* CART */}

            <button
              onClick={handleAddToCart}

              disabled={productInCart}

              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-white disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
            >
              <ShoppingCart size={18} />

              {productInCart ? 'Already in Cart' : 'Add To Cart'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
