'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

import axios from 'axios';
import toast from 'react-hot-toast';
import { generateGuestId } from '@/lib/generateGuestId';
import { useLoading } from '@/context/LoadingContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [guestId, setGuestId] = useState('');
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const { loading, startLoading, stopLoading } = useLoading();
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  // Get Guest Id
  useEffect(() => {
    const id = generateGuestId();

    setGuestId(id);
  }, []);

  // Fetch Cart Count
  const fetchCartCount = useCallback(
    async (id = guestId) => {
      if (!id) return;

      try {
        const { data } = await axios.get(
          `/api/carts/count?guestId=${id}`,
        );

        if (data.success) {
          // console.log('data.success==>', data);
          setCartCount(data.count);
        } else {
          setCartCount(0);
        }
      } catch (error) {
        console.error('FETCH CART COUNT ERROR:', error);
        setCartCount(0);
      }
    },
    [guestId],
  );

  const fetchCart = useCallback(
    async (id = guestId, firstLoad = false) => {
      if (!id) {
        setInitialLoading(false);
        return;
      }

      try {
        if (firstLoad) {
          setInitialLoading(true);
        }

        const response = await axios.get(`/api/carts?guestId=${id}`);
        // console.log('CART API RESPONSE:', response.data);
        if (response.data.success) {
          setCart(response.data.data[0] || null);
        }
      } catch (error) {
        console.error('FETCH CART ERROR:', error);

        setCart(null);
      } finally {
        if (firstLoad) {
          setInitialLoading(false);
        }
      }
    },
    [guestId],
  );

  // Initial Fetch

  useEffect(() => {
    if (!guestId) {
      setInitialLoading(false);
      return;
    }

    fetchCart(guestId, true);
    fetchCartCount(guestId);
  }, [guestId]);

  // Add To Cart
  const addToCart = async (product, quantity = 1) => {
    try {
      let currentGuestId = guestId;

      if (!currentGuestId) {
        currentGuestId = generateGuestId();

        localStorage.setItem('guestId', currentGuestId);

        setGuestId(currentGuestId);
      }

      const { data } = await axios.post('/api/carts', {
        guestId: currentGuestId,
        productId: product._id,
        quantity,
      });

      if (data.success) {
        // toast.success(data.message);
        // toast.success(`${product.name} added to cart`);
        toast.success(`${product.name} has been added to your cart`);
        // toast.success(`${product.name} added to cart successfully`);
        // Refresh Context Cart
        await fetchCart(currentGuestId);
        await fetchCartCount(currentGuestId);

        return {
          success: true,
        };
      }
    } catch (error) {
      // console.log('FULL CART ERROR ==> ', error);
      // console.log('RESPONSE ERROR ==> ', error.response?.data);
      // console.log('STATUS ==> ', error.response?.status);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );

      // console.log('ADD CART ERROR ==> ', error.response?.data);

      return {
        success: false,
      };
    }
  };

  // Remove From Cart
  const removeFromCart = async (productId) => {
    startLoading();
    try {
      const updatedItems = cart.items.filter(
        (item) => item.productId._id !== productId,
      );

      // Last item remove ho gaya
      if (updatedItems.length === 0) {
        await axios.delete(`/api/carts/${guestId}`);

        setCart(null);
        setCartCount(0);
        toast.success('Item removed from cart');
        return {
          success: true,
        };
      }

      await axios.put(`/api/carts/${guestId}`, {
        items: updatedItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      });

      if (updatedItems.length === 0) {
        setCart(null);
        setCartCount(0);
        toast.success('Item removed from cart');
        return {
          success: true,
        };
      }

      await fetchCart(guestId);
      await fetchCartCount(guestId);
      toast.success('Item removed from cart');
      return {
        success: true,
      };
    } catch (error) {
      console.error('REMOVE CART ERROR:', error);
      toast.error(
        error.response?.data?.message ||
          'Failed to remove item from cart',
      );
      return {
        success: false,
      };
    } finally {
      stopLoading();
    }
  };

  // Update Quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      startLoading();
      const updatedItems = cart.items.map((item) => {
        if (item.productId._id === productId) {
          return {
            productId: item.productId._id,
            quantity,
          };
        }

        return {
          productId: item.productId._id,
          quantity: item.quantity,
        };
      });

      await axios.put(`/api/carts/${guestId}`, {
        items: updatedItems,
      });

      await fetchCart(guestId);

      await fetchCartCount(guestId);
      toast.success('Cart updated successfully');
      return {
        success: true,
      };
    } catch (error) {
      console.error('UPDATE CART ERROR:', error);
      toast.error(
        error.response?.data?.message || 'Failed to update cart',
      );
      return {
        success: false,
      };
    } finally {
      stopLoading();
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      startLoading();
      await axios.delete(`/api/carts/${guestId}`, {
        data: {
          guestId,
        },
      });

      setCart(null);
      setCartCount(0);
      toast.success('Cart cleared successfully');
      return {
        success: true,
      };
    } catch (error) {
      console.error('CLEAR CART ERROR:', error);
      toast.error(
        error.response?.data?.message || 'Failed to clear cart',
      );
      return {
        success: false,
      };
    } finally {
      stopLoading();
    }
  };

  const isInCart = (productId) => {
    return (
      cart?.items?.some(
        (item) => item.productId?._id === productId,
      ) || false
    );
  };

  return (
    <CartContext.Provider
      value={{
        guestId,
        cart,
        cartCount,
        loading,
        initialLoading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isInCart,
        coupon,
        setCoupon,
        cartDrawerOpen,
        setCartDrawerOpen,
        discount,
        setDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
