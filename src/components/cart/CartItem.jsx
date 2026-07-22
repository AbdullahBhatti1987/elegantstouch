// // 'use client';

// // import Image from 'next/image';
// // import { Trash2 } from 'lucide-react';
// // import QuantitySelector from './QuantitySelector';

// // export default function CartItem({
// //   item,
// //   onIncrease,
// //   onDecrease,
// //   onRemove,
// // }) {
// //   return (
// //     <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
// //       {/* IMAGE */}

// //       <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
// //         <Image
// //           src={item.image}
// //           alt={item.name}
// //           fill
// //           sizes="120px"
// //           className="object-cover"
// //         />
// //       </div>

// //       {/* DETAILS */}

// //       <div className="flex flex-1 flex-col justify-between">
// //         <div>
// //           <h3 className="line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
// //             {item.name}
// //           </h3>

// //           <p className="mt-2 text-sm font-semibold text-pink-600">
// //             Rs. {item.price}
// //           </p>
// //         </div>

// //         <div className="mt-4 flex items-center justify-between">
// //           {/* QUANTITY */}

// //           <QuantitySelector
// //             quantity={item.quantity}
// //             onIncrease={onIncrease}
// //             onDecrease={onDecrease}
// //           />

// //           {/* REMOVE */}

// //           <button
// //             onClick={onRemove}
// //             className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
// //           >
// //             <Trash2 size={18} />
// //           </button>
// //         </div>
// //       </div>

// //       {/* TOTAL */}

// //       <div className="flex items-center justify-end sm:w-32">
// //         <p className="text-lg font-bold text-gray-900 dark:text-white">
// //           Rs. {item.price * item.quantity}
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// import Image from 'next/image';
// import { Trash2 } from 'lucide-react';
// import QuantitySelector from './QuantitySelector';

// export default function CartItem({
//   item,
//   onIncrease,
//   onDecrease,
//   onRemove,
// }) {
//   return (
//     <div className="flex gap-3 rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md sm:gap-5 sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
//       {/* IMAGE */}

//       <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
//         <Image
//           src={item.image}
//           alt={item.name}
//           fill
//           sizes="(max-width:640px) 80px, 112px"
//           className="object-cover"
//         />
//       </div>

//       {/* CONTENT */}

//       <div className="flex min-w-0 flex-1 flex-col justify-between">
//         <div>
//           <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
//             {item.name}
//           </h3>

//           <p className="mt-2 text-sm font-semibold text-pink-600">
//             Rs. {item.price}
//           </p>
//         </div>

//         <div className="mt-4 flex items-center justify-between gap-3">
//           {/* QUANTITY */}

//           <QuantitySelector
//             quantity={item.quantity}
//             onIncrease={onIncrease}
//             onDecrease={onDecrease}
//           />

//           {/* REMOVE */}

//           <button
//             onClick={onRemove}
//             className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 sm:h-9 sm:w-9 dark:hover:bg-red-950"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>

//       {/* TOTAL */}

//       <div className="flex shrink-0 items-end justify-end sm:items-center">
//         <p className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
//           Rs. {item.price * item.quantity}
//         </p>
//       </div>
//     </div>
//   );
// }

'use client';

import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import QuantitySelector from './QuantitySelector';

export default function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  return (
    <div className="relative rounded-2xl border bg-white p-3 shadow-sm transition hover:shadow-md sm:p-4 dark:border-zinc-800 dark:bg-zinc-900">
      {/* REMOVE BUTTON */}

      <button
        onClick={onRemove}
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
      >
        <Trash2 size={18} />
      </button>

      <div className="flex gap-3 sm:gap-5">
        {/* IMAGE */}

        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-28 sm:w-28">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width:640px) 80px, 112px"
            className="object-cover"
          />
        </div>

        {/* CONTENT */}

        <div className="flex min-w-0 flex-1 flex-col justify-between pr-10">
          <div>
            {/* CATEGORY */}

            {/* NAME */}
            <div className="mt-1 flex items-center gap-3">
              <h3 className="line-clamp-1 text-sm font-semibold text-gray-900 sm:text-base dark:text-white">
                {item.name}
              </h3>
              <p className="text-[11px] tracking-wide text-gray-400 uppercase">
                {item.category}
              </p>

             
            </div>
            {/* PRICE */}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-sm font-bold text-pink-600 sm:text-base">
                Rs. {item.price}
              </span>

              {item.originalPrice > item.price && (
                <span className="text-xs text-gray-500 line-through sm:text-sm">
                  Rs. {item.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="mt-1 flex items-center justify-between">
            {/* QUANTITY */}

            <div className="mt-4">
              <QuantitySelector
                quantity={item.quantity}
                onIncrease={onIncrease}
                onDecrease={onDecrease}
              />
            </div>

            <div className="absolute right-4 bottom-3 sm:right-5 sm:bottom-4">
              <p className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                Rs. {item.price * item.quantity}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
