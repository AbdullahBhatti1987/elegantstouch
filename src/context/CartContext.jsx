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

const CartContext = createContext();

export function CartProvider({ children }) {
  const [guestId, setGuestId] = useState('');
  const [cart, setCart] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get Guest Id
  useEffect(() => {
    const storedGuestId = localStorage.getItem('guestId');

    if (storedGuestId) {
      setGuestId(storedGuestId);
    }
  }, []);

  // Fetch Cart Count
  const fetchCartCount = useCallback(
    async (id = guestId) => {
      if (!id) return;

      try {
        const { data } = await axios.get(
          `/api/cart/count?guestId=${id}`,
        );

        if (data.success) {
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
    async (id = guestId) => {
      if (!id) return;

      try {
        setLoading(true);

        const response = await axios.get(`/api/cart?guestId=${id}`);

        const cartData =
          response.data?.cart || response.data?.data || null;

        setCart(cartData);
      } catch (error) {
        console.error('FETCH CART ERROR:', error);
        setCart(null);
      } finally {
        setLoading(false);
      }
    },
    [guestId],
  );

  // Initial Fetch

  useEffect(() => {
    if (guestId) {
      fetchCart();
      fetchCartCount();
    }
  }, [guestId, fetchCart]);

  // Add To Cart
  const addToCart = async (product, quantity = 1) => {
    try {
      let currentGuestId = guestId;

      if (!currentGuestId) {
        currentGuestId = generateGuestId();

        localStorage.setItem('guestId', currentGuestId);

        setGuestId(currentGuestId);
      }

      const { data } = await axios.post('/api/cart', {
        guestId: currentGuestId,
        productId: product._id,
        quantity,
      });

      if (data.success) {
        toast.success(data.message);

        // Refresh Context Cart
        await fetchCart(currentGuestId);
        await fetchCartCount(currentGuestId);

        return {
          success: true,
        };
      }
    } catch (error) {
      console.log('FULL CART ERROR ==> ', error);
      console.log('RESPONSE ERROR ==> ', error.response?.data);
      console.log('STATUS ==> ', error.response?.status);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );

      console.log('ADD CART ERROR ==> ', error.response?.data);

      return {
        success: false,
      };
    }
  };

  // Remove From Cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete('/api/cart/remove', {
        data: {
          guestId,
          productId,
        },
      });

      await fetchCart(guestId);

      return {
        success: true,
      };
    } catch (error) {
      console.error('REMOVE CART ERROR:', error);

      return {
        success: false,
      };
    }
  };

  // Update Quantity
  const updateCartQuantity = async (productId, quantity) => {
    try {
      await axios.put('/api/cart/update', {
        guestId,
        productId,
        quantity,
      });

      await fetchCart(guestId);

      return {
        success: true,
      };
    } catch (error) {
      console.error('UPDATE CART ERROR:', error);

      return {
        success: false,
      };
    }
  };

  // Clear Cart
  const clearCart = async () => {
    try {
      await axios.delete('/api/cart/clear', {
        data: {
          guestId,
        },
      });

      setCart(null);
      setCartCount(0);

      return {
        success: true,
      };
    } catch (error) {
      console.error('CLEAR CART ERROR:', error);

      return {
        success: false,
      };
    }
  };

  return (
    <CartContext.Provider
      value={{
        guestId,
        cart,
        cartCount,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
