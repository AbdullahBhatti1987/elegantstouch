// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// export default function CustomDropdown({
//   label,
//   value,
//   onChange,
//   options = [],
//   placeholder = 'Select Option',
// }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(e.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const selected = options.find((item) => item.value === value);

//   return (
//     <div className="pt-1">
//       <label className="mb-2 block text-sm font-medium">
//         {label}
//       </label>

//       <div ref={dropdownRef} className="relative">
//         <button
//           type="button"
//           onClick={() => setOpen((prev) => !prev)}
//           className="flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 text-sm dark:bg-gray-900"
//         >
//           <span className="truncate">
//             {selected?.label || placeholder}
//           </span>

//           <ChevronDown
//             size={18}
//             className={`transition-transform ${
//               open ? 'rotate-180' : ''
//             }`}
//           />
//         </button>

//         {open && (
//           <div className="absolute z-50 mt-2 max-h-52 w-full overflow-y-auto rounded-lg border bg-white shadow-lg dark:bg-gray-900">
//             {options.map((option) => (
//               <button
//                 key={option.value}
//                 type="button"
//                 onClick={() => {
//                   onChange({
//                     target: {
//                       value: option.value,
//                     },
//                   });

//                   setOpen(false);
//                 }}
//                 className="block w-full truncate px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
//               >
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CustomDropdown({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select Option',
  multiple = false,
  selectedValues = [],
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selected = options.find((item) => item.value === value);

  const toggleMultiple = (id) => {
    if (selectedValues.includes(id)) {
      onChange(selectedValues.filter((item) => item !== id));
    } else {
      onChange([...selectedValues, id]);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-between rounded-lg border  border-gray-300  bg-white px-3 text-sm dark:bg-gray-900"
        >
          <span className="truncate">
            {multiple
              ? selectedValues.length > 0
                ? `${selectedValues.length} Selected`
                : placeholder
              : selected?.label || placeholder}
          </span>

          <ChevronDown
            size={18}
            className={`transition-transform ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {open && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-lg dark:bg-gray-900">
            {options.map((option) =>
              multiple ? (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option.value)}
                    onChange={() => toggleMultiple(option.value)}
                    className="h-4 w-4"
                  />

                  <span className="truncate">{option.label}</span>
                </label>
              ) : (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange({
                      target: {
                        value: option.value,
                      },
                    });

                    setOpen(false);
                  }}
                  className="block w-full truncate px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {option.label}
                </button>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
