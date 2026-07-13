// export default function Checkbox({
//   label,
//   name,
//   checked,
//   onChange,
//   disabled = false,
//    loading = false,
//   error = '',
// }) {
//   return (
//     <label className="flex items-center gap-2 cursor-pointer">

//       <input
//         type="checkbox"
//         name={name}
//         checked={checked}
//         onChange={onChange}
//         disabled={disabled}
//         className="h-4 w-4"

//       />

//       <span className="text-gray-700 dark:text-gray-200">
//         {label}
//       </span>

//     </label>
//   );
// }
'use client';

import { Loader2 } from 'lucide-react';

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  loading = false,
  error = '',
}) {

  return (
    <div className="w-full">
      <label
        className={`flex items-center gap-3 ${
          loading
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer'
        } `}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin text-gray-500" />
        ) : (
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={loading}
            aria-invalid={!!error}
            className={`h-4 w-4 rounded accent-black dark:accent-white ${
              error ? 'ring-2 ring-red-500' : ''
            } `}
          />
        )}

        <span className="text-gray-700 dark:text-gray-200">
          {label}
        </span>
      </label>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
