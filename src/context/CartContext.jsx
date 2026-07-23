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
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

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
        console.log('firstLoad==>', firstLoad);

        const response = await axios.get(`/api/cart?guestId=${id}`);
        console.log('response==>', response);
        if (response.data.success) {
          setCart(response.data.data);
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
    if (guestId) {
      fetchCart(guestId, true);
      fetchCartCount(guestId);
    } else {
      setInitialLoading(false);
    }
  }, [guestId, fetchCart, fetchCartCount]);

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
      const updatedItems = cart.items.filter(
        (item) => item.productId._id !== productId,
      );

      await axios.put(`/api/cart/${guestId}`, {
        items: updatedItems.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
      });

      if (updatedItems.length === 0) {
        setCart(null);
        setCartCount(0);
        return {
          success: true,
        };
      }

      await fetchCart(guestId);

      await fetchCartCount(guestId);

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

      await axios.put(`/api/cart/${guestId}`, {
        items: updatedItems,
      });

      await fetchCart(guestId);

      await fetchCartCount(guestId);

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
      await axios.delete(`/api/cart/${guestId}`, {
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

  const isInCart = (productId) => {
    return cart?.items?.some(
      (item) => item.productId?._id === productId,
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
