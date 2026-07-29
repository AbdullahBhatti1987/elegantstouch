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

//       className={`flex items-center gap-2 rounded-lg shadow-lg px-4 py-2 text-white transition-all duration-200 ${
//         disabled
//           ? `cursor-not-allowed bg-gray-400 opacity-50 `
//           : `bg-primary hover:opacity-90 active:scale-95 active:shadow-inner`
//       } `}
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
  loading = false,
}) {
  const isDisabled = disabled || loading;
  return (
    <button
      onClick={onMoveAll}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs shadow-lg transition-all duration-200 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm ${
        isDisabled
          ? 'cursor-not-allowed bg-gray-400 opacity-50'
          : 'bg-primary text-white hover:opacity-90 active:scale-95 active:shadow-inner'
      }`}
    >
      <ShoppingCart className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />

      <span className="truncate">
        {loading ? 'Moving...' : 'Move All To Cart'}
      </span>
    </button>
  );
}
