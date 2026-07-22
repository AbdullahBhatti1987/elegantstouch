
'use client';

import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistShare({ items = [] }) {
  const handleShare = async () => {
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Wishlist',
          text: `Check out my wishlist (${items.length} items)`,
          url: shareUrl,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);

      toast.success('Wishlist link copied!');
    }
  };

  return (
    <button
      onClick={handleShare}

      className="flex items-center gap-2 rounded-lg bg-primary hover:opacity-90 active:scale-95 shadow-lg active:shadow-inner text-white px-4 py-2 transition-all duration-200 hover:bg-gray-50 active:scale-95 active:bg-gray-100"
    >
      <Share2 size={18} />
      Share Wishlist
    </button>
  );
}
