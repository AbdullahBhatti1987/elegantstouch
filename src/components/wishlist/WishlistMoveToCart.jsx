// 'use client';

// import { ShoppingCart } from 'lucide-react';

// export default function WishlistMoveToCart({
//   onMoveAll,
//   disabled = false,
// }) {
//   return (
//     <button
//       onClick={onMoveAll}
//       disabled={disabled}
//       className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       <ShoppingCart size={18} />
//       Move All To Cart
//     </button>
//   );
// }

'use client';

import { ShoppingCart } from 'lucide-react';

export default function WishlistMoveToCart({
  onMoveAll,
  disabled = false,
}) {
  return (
    <button
      onClick={onMoveAll}

      disabled={disabled}

      className={`flex items-center gap-2 rounded-lg shadow-lg px-4 py-2 text-white transition-all duration-200 ${
        disabled
          ? `cursor-not-allowed bg-gray-400 opacity-50 `
          : `bg-primary hover:opacity-90 active:scale-95 active:shadow-inner`
      } `}
    >
      <ShoppingCart size={18} />
      Move All To Cart
    </button>
  );
}
