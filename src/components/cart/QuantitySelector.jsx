// import { Minus, Plus } from 'lucide-react';

// export default function QuantitySelector({
//   quantity,
//   onIncrease,
//   onDecrease,
// }) {
//   return (
//     <div className="flex items-center rounded-md border border-gray-300 bg-gray-50 shadow-sm transition-all duration-200 dark:border-zinc-700 dark:bg-zinc-800">
//       <button
//         onClick={onDecrease}
//         disabled={quantity <= 1}
//         className="flex h-7 w-7 items-center justify-center rounded-md transition-all duration-150 hover:bg-white hover:shadow-sm active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 sm:h-8 sm:w-8 dark:hover:bg-zinc-700"
//       >
//         <Minus size={13} className="sm:size-[15px]" />
//       </button>

//       <span className="w-8 text-center text-xs font-semibold sm:w-10 sm:text-sm">
//         {quantity}
//       </span>

//       <button
//         onClick={onIncrease}
//         className="flex h-7 w-7 items-center justify-center rounded-md transition-all duration-150 hover:bg-white hover:shadow-sm active:scale-90 sm:h-8 sm:w-8 dark:hover:bg-zinc-700"
//       >
//         <Plus size={13} className="sm:size-[15px]" />
//       </button>
//     </div>
//   );
// }
import { Minus, Plus } from 'lucide-react';

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  className = '',
}) {
  return (
    <div
      className={`flex justify-between h-9 w-fit items-center rounded-md border border-gray-300 bg-gray-50 shadow-sm transition-all duration-200 sm:h-12 dark:border-zinc-700 dark:bg-zinc-800 ${className} `}
    >
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="flex h-full w-8 items-center justify-center rounded-md transition-all hover:bg-white hover:shadow-sm active:scale-90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-12 dark:hover:bg-zinc-700"
      >
        <Minus size={14} className="sm:size-[16px]" />
      </button>

      <span className="w-8 text-center text-xs font-semibold sm:w-10 sm:text-sm">
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        className="flex h-full w-8 items-center justify-center rounded-md transition-all hover:bg-white hover:shadow-sm active:scale-90 sm:w-12 dark:hover:bg-zinc-700"
      >
        <Plus size={14} className="sm:size-[16px]" />
      </button>
    </div>
  );
}
