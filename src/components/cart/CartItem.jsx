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
//     <div className="flex gap-4 rounded-xl border p-4">
//       {' '}
//       <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
//         {' '}
//         <Image
//           src={item.image}
//           alt={item.name}
//           fill priority
//           className="object-cover"
//         />{' '}
//       </div>
//       <div className="flex flex-1 flex-col justify-between">
//         <div>
//           <h3 className="font-semibold">{item.name}</h3>

//           <p className="text-primary mt-1 font-medium">
//             Rs. {item.price}
//           </p>
//         </div>

//         <div className="mt-3 flex items-center justify-between">
//           <QuantitySelector
//             quantity={item.quantity}
//             onIncrease={onIncrease}
//             onDecrease={onDecrease}
//           />

//           <button onClick={onRemove} className="text-red-500">
//             <Trash2 size={18} />
//           </button>
//         </div>
//       </div>
//       <div className="font-semibold">
//         Rs. {item.price * item.quantity}
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
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
      {/* IMAGE */}

      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="120px"
          className="object-cover"
        />
      </div>

      {/* DETAILS */}

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
            {item.name}
          </h3>

          <p className="mt-2 text-sm font-semibold text-pink-600">
            Rs. {item.price}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* QUANTITY */}

          <QuantitySelector
            quantity={item.quantity}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
          />

          {/* REMOVE */}

          <button
            onClick={onRemove}
            className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* TOTAL */}

      <div className="flex items-center justify-end sm:w-32">
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          Rs. {item.price * item.quantity}
        </p>
      </div>
    </div>
  );
}
