// 'use client';

// import { Search } from 'lucide-react';

// export default function SearchInput({
//   value = '',
//   onChange,
//   onSearch,
//   placeholder = 'Search...',
//   className = '',
// }) {
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       onSearch();
//     }
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <input
//         type="text"
//         value={value}
//         placeholder={placeholder}

//         onChange={(e) => onChange(e.target.value)}

//         onKeyDown={handleKeyDown}

//         className="w-full rounded-lg border bg-white py-2 pr-12 pl-4 transition outline-none focus:border-black dark:bg-gray-900 dark:text-white"
//       />

//       <button
//         type="button"
//         onClick={onSearch}
//         className="absolute top-1/2 right-2 bg-gray-100 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
//       >
//         <Search size={18}  />
//       </button>
//     </div>
//   );
// }

'use client';

import { Search } from 'lucide-react';

export default function SearchInput({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  className = '',
  disabled = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-lg border bg-white py-2 pr-10 pl-4 outline-none focus:border-black dark:bg-gray-900 dark:text-white"
      />

      {/* Search Button */}
      <button
        type="button"
        onClick={() => onSearch?.(value)}
        disabled={disabled}
        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-black disabled:opacity-50 dark:hover:bg-gray-800"
      >
        <Search size={18} />
      </button>
    </div>
  );
}
