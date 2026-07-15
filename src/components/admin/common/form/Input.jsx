// export default function Input({
//   label,
//   name,
//   value,
//   onChange,
//   type = 'text',
//   placeholder = '',
//   required = false,
//   disabled = false,
//   error = '',
//   className = '',
// }) {
//   return (
//     <div className="w-full">
//       {label && (
//         <label
//           htmlFor={name}
//           className="mb-2 block font-medium text-gray-700 dark:text-gray-200"
//         >
//           {label}

//           {required && (
//             <span className="ml-1 text-red-500">*</span>
//           )}
//         </label>
//       )}

//       <input
//         id={name}
//         name={name}
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         disabled={disabled}
//         required={required}
//         className={`w-full rounded-lg border px-3 py-2 outline-none transition focus:border-black dark:bg-gray-800 dark:text-white ${className}`}
//       />

//       {error && (
//         <p className="mt-1 text-sm text-red-500">
//           {error}
//         </p>
//       )}
//     </div>
//   );
// }

'use client';

import { Loader2 } from 'lucide-react';

export default function Input({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  required = false,
  loading = false,
  disabled = false,
  error = '',
  success = false,
  autoComplete = 'off',
  readOnly = false,
  min,
  max,
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
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={loading}
          readOnly={readOnly}
          autoComplete={autoComplete}
          min={min}
          max={max}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full rounded-lg border px-3 py-2 transition outline-none dark:bg-gray-800 dark:text-white ${
            error
              ? 'border-red-500 focus:border-red-500'
              : success
                ? 'border-green-500 focus:border-green-500'
                : 'border-gray-300 focus:border-black dark:border-gray-700'
          } ${
            loading ? 'cursor-not-allowed opacity-60' : ''
          } ${className} `}
        />

        {/* {loading && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <Loader2
              size={18}
              className="animate-spin text-gray-500"
            />
          </div>
        )} */}
      </div>

      {error && (
        <p id={`${name}-error`} className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
