// 'use client';

// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
// } from 'react';

// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { generateGuestId } from '@/lib/generateGuestId';
// import { useLoading } from '@/context/LoadingContext';

// const WishlistContext = createContext();

// export function WishlistProvider({ children }) {
//   const [guestId, setGuestId] = useState('');
//   const [wishlist, setWishlist] = useState(null);
//   const [wishlistCount, setWishlistCount] = useState(0);
//   const { loading, startLoading, stopLoading } = useLoading();
//   const [initialLoading, setInitialLoading] = useState(true);

//   // Get Guest Id
//   useEffect(() => {
//     let id = localStorage.getItem('guestId');

//     if (!id) {
//       id = generateGuestId();

//       localStorage.setItem('guestId', id);
//     }

//     setGuestId(id);
//   }, []);

//   // Fetch Wishlist Count
//   const fetchWishlistCount = useCallback(
//     async (id = guestId) => {
//       if (!id) return;

//       try {
//         const { data } = await axios.get(
//           `/api/wishlists/count?guestId=${id}`,
//         );
//         // console.log('wish Data==>', data);

//         if (data.success) {
//           setWishlistCount(data.count);
//         } else {
//           setWishlistCount(0);
//         }
//       } catch (error) {
//         console.error('FETCH WISHLIST COUNT ERROR:', error);

//         setWishlistCount(0);
//       }
//     },
//     [guestId],
//   );

//   // Fetch Wishlist
//   const fetchWishlist = useCallback(
//     async (id = guestId, firstLoad = false) => {
//       if (!id) return;

//       try {
//         if (firstLoad) {
//           setInitialLoading(true);
//         }

//         const { data } = await axios.get(`/api/wishlists/${id}`);

//         if (data.success) {
//           setWishlist(data.data);
//         }
//       } catch (error) {
//         console.error('FETCH WISHLIST ERROR:', error);

//         setWishlist(null);
//       } finally {
//         if (firstLoad) {
//           setInitialLoading(false);
//         }
//       }
//     },
//     [guestId],
//   );

//   // Initial Fetch
//   useEffect(() => {
//     if (guestId) {
//       fetchWishlistCount();
//     }
//   }, [guestId]);

//   //  Fetch

//   useEffect(() => {
//     if (!guestId) return;

//     fetchWishlist(guestId, true);
//     fetchWishlistCount(guestId);
//   }, [guestId, fetchWishlist, fetchWishlistCount]);

//   useEffect(() => {
//     if (guestId) {
//       fetchWishlist(guestId, true);
//       fetchWishlistCount(guestId);
//     }
//   }, [guestId]);

//   // Add To Wishlist
//   const addToWishlist = async (product) => {
//     try {
//       let currentGuestId = guestId;

//       if (!id) {
//         id = generateGuestId();
//         localStorage.setItem('guestId', id);
//       }
//       const { data } = await axios.post('/api/wishlists', {
//         guestId: currentGuestId,
//         productId: product._id,
//       });

//       if (data.success) {
//         toast.success(data.message);

//         await fetchWishlist(currentGuestId);
//         await fetchWishlistCount(currentGuestId);

//         return {
//           success: true,
//         };
//       }
//     } catch (error) {
//       console.error('ADD WISHLIST ERROR:', error);

//       toast.error(
//         error.response?.data?.message || 'Something went wrong',
//       );

//       return {
//         success: false,
//       };
//     }
//   };

//   // Remove From Wishlist
//   const removeFromWishlist = async (productId) => {
//     try {
//       const updatedItems = wishlist.items.filter(
//         (item) => item.productId._id !== productId,
//       );

//       // Last item remove ho gaya
//       if (updatedItems.length === 0) {
//         await axios.delete(`/api/wishlists/${guestId}`);

//         setWishlist(null);
//         setWishlistCount(0);

//         return {
//           success: true,
//         };
//       }

//       await axios.put(`/api/wishlists/${guestId}`, {
//         items: updatedItems.map((item) => ({
//           productId: item.productId._id,
//         })),
//       });

//       await fetchWishlist(guestId);
//       await fetchWishlistCount(guestId);

//       return {
//         success: true,
//       };
//     } catch (error) {
//       console.error('REMOVE WISHLIST ERROR:', error);

//       return {
//         success: false,
//       };
//     }
//   };

//   // Clear Wishlist
//   const clearWishlist = async () => {
//     try {
//       await axios.delete(`/api/wishlists/${guestId}`, {
//         data: {
//           guestId,
//         },
//       });

//       setWishlist(null);
//       setWishlistCount(0);

//       return {
//         success: true,
//       };
//     } catch (error) {
//       console.error('CLEAR WISHLIST ERROR:', error);

//       return {
//         success: false,
//       };
//     }
//   };

//   // Check Product Exists
//   const isInWishlist = (productId) => {
//     return wishlist?.items?.some(
//       (item) => item.productId?._id === productId,
//     );
//   };

//   return (
//     <WishlistContext.Provider
//       value={{
//         guestId,
//         wishlist,
//         wishlistCount,
//         loading,
//         initialLoading,
//         fetchWishlist,
//         fetchWishlistCount,
//         addToWishlist,
//         removeFromWishlist,
//         clearWishlist,
//         isInWishlist,
//       }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// export function useWishlist() {
//   return useContext(WishlistContext);
// }

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

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [guestId, setGuestId] = useState('');

  const [wishlist, setWishlist] = useState(null);

  const [wishlistCount, setWishlistCount] = useState(0);

  const [initialLoading, setInitialLoading] = useState(true);

  const { loading } = useLoading();

  // ================= GET / CREATE GUEST ID =================

  useEffect(() => {
    let id = localStorage.getItem('guestId');

    if (!id) {
      id = generateGuestId();

      localStorage.setItem('guestId', id);
    }

    setGuestId(id);
  }, []);

  // ================= FETCH WISHLIST COUNT =================

  const fetchWishlistCount = useCallback(
    async (id = guestId) => {
      if (!id) return;

      try {
        const { data } = await axios.get(
          `/api/wishlists/count?guestId=${id}`,
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

  // ================= FETCH WISHLIST =================

  const fetchWishlist = useCallback(
    async (id = guestId, firstLoad = false) => {
      if (!id) return;

      try {
        if (firstLoad) {
          setInitialLoading(true);
        }

        const { data } = await axios.get(`/api/wishlists/${id}`);

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

  // ================= INITIAL FETCH =================

  useEffect(() => {
    if (!guestId) return;

    fetchWishlist(guestId, true);

    fetchWishlistCount(guestId);
  }, [guestId, fetchWishlist, fetchWishlistCount]);

  // ================= ADD TO WISHLIST =================

  const addToWishlist = async (product) => {
    try {
      let currentGuestId = guestId;

      if (!currentGuestId) {
        currentGuestId = generateGuestId();

        localStorage.setItem('guestId', currentGuestId);

        setGuestId(currentGuestId);
      }

      const { data } = await axios.post('/api/wishlists', {
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

  // ================= REMOVE FROM WISHLIST =================

  const removeFromWishlist = async (productId) => {
    try {
      const updatedItems = wishlist.items.filter(
        (item) => item.productId._id !== productId,
      );

      if (updatedItems.length === 0) {
        await axios.delete(`/api/wishlists/${guestId}`);

        setWishlist(null);

        setWishlistCount(0);

        return {
          success: true,
        };
      }

      await axios.put(`/api/wishlists/${guestId}`, {
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

  // ================= CLEAR WISHLIST =================

  const clearWishlist = async () => {
    try {
      await axios.delete(`/api/wishlists/${guestId}`, {
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

  // ================= CHECK PRODUCT =================

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
