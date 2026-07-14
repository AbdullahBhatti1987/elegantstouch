'use client';

import { Share2 } from 'lucide-react';

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
        console.error(error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Wishlist link copied!');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-gray-50"
    >
      <Share2 size={18} />
      Share Wishlist
    </button>
  );
}
