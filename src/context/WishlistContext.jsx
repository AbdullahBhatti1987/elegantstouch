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

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [guestId, setGuestId] = useState('');
  const [wishlist, setWishlist] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);

  // Get Guest Id
  useEffect(() => {
    const storedGuestId = localStorage.getItem('guestId');

    if (storedGuestId) {
      setGuestId(storedGuestId);
    }
  }, []);

  // Fetch Wishlist Count
  const fetchWishlistCount = useCallback(
    async (id = guestId) => {
      if (!id) return;

      try {
        const { data } = await axios.get(
          `/api/wishlist/count?guestId=${id}`,
        );

        if (data.success) {
          setWishlistCount(data.count);
        } else {
          setWishlistCount(0);
        }
      } catch (error) {
        console.error('FETCH WISHLIST COUNT ERROR:', error);

        setWishlistCount(0);
      }
    },
    [guestId],
  );

  // Fetch Wishlist
  const fetchWishlist = useCallback(
    async (id = guestId, firstLoad = false) => {
      if (!id) return;

      try {
        if (firstLoad) {
          setInitialLoading(true);
        }

        const { data } = await axios.get(`/api/wishlist/${id}`);

        if (data.success) {
          setWishlist(data.data);
        }
      } catch (error) {
        console.error('FETCH WISHLIST ERROR:', error);

        setWishlist(null);
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
      fetchWishlist();
      fetchWishlistCount();
    } else {
      setLoading(false);
    }
  }, [guestId, fetchWishlist, fetchWishlistCount]);

  // Add To Wishlist
  const addToWishlist = async (product) => {
    try {
      let currentGuestId = guestId;

      if (!currentGuestId) {
        currentGuestId = generateGuestId();

        localStorage.setItem('guestId', currentGuestId);

        setGuestId(currentGuestId);
      }

      const { data } = await axios.post('/api/wishlist', {
        guestId: currentGuestId,
        productId: product._id,
      });

      if (data.success) {
        toast.success(data.message);

        await fetchWishlist(currentGuestId);
        await fetchWishlistCount(currentGuestId);

        return {
          success: true,
        };
      }
    } catch (error) {
      console.error('ADD WISHLIST ERROR:', error);

      toast.error(
        error.response?.data?.message || 'Something went wrong',
      );

      return {
        success: false,
      };
    }
  };

  // Remove From Wishlist
  const removeFromWishlist = async (productId) => {
    try {
      const updatedItems = wishlist.items.filter(
        (item) => item.productId._id !== productId,
      );

      await axios.put(`/api/wishlist/${guestId}`, {
        items: updatedItems.map((item) => ({
          productId: item.productId._id,
        })),
      });

      await fetchWishlist(guestId);
      await fetchWishlistCount(guestId);

      return {
        success: true,
      };
    } catch (error) {
      console.error('REMOVE WISHLIST ERROR:', error);

      return {
        success: false,
      };
    }
  };

  // Clear Wishlist
  const clearWishlist = async () => {
    try {
      await axios.delete(`/api/wishlist/${guestId}`, {
        data: {
          guestId,
        },
      });

      setWishlist(null);
      setWishlistCount(0);

      return {
        success: true,
      };
    } catch (error) {
      console.error('CLEAR WISHLIST ERROR:', error);

      return {
        success: false,
      };
    }
  };

  // Check Product Exists
  const isInWishlist = (productId) => {
    return wishlist?.items?.some(
      (item) => item.productId?._id === productId,
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        guestId,
        wishlist,
        wishlistCount,
        loading,
        initialLoading,
        fetchWishlist,
        fetchWishlistCount,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
