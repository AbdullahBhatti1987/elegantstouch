// export default function Select({
//   label,
//   name,
//   value,
//   onChange,
//   options = [],
//   placeholder = 'Select option',
//   required = false,
//   disabled = false,
//   error = '',
// }) {
//   return (
//     <div className="w-full">
//       {label && (
//         <label
//           htmlFor={name}
//           className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
//         >
//           {label}

//           {required && <span className="ml-1 text-red-500">*</span>}
//         </label>
//       )}

//       <select
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         required={required}
//         className="w-full rounded-lg border px-3 py-2 dark:bg-gray-800 dark:text-white"
//       >
//         <option value="">{placeholder}</option>

//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }

'use client';

import { Loader2 } from 'lucide-react';

export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Select option',
  required,

  loading,
  error = '',
  className = '',
}) {

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
        >
          {label}

          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          disabled={loading}
          required={required}
          aria-invalid={!!error}
          className={`w-full appearance-none rounded-lg border px-3 py-2 transition outline-none dark:bg-gray-800 dark:text-white ${
            error
              ? 'border-red-500 focus:border-red-500'
              : 'border-gray-300 focus:border-black dark:border-gray-700'
          } ${
            loading ? 'cursor-not-allowed opacity-60' : ''
          } ${className} `}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {loading && (
          <Loader2
            size={18}
            className="absolute top-1/2 right-3 -translate-y-1/2 animate-spin text-gray-500"
          />
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
