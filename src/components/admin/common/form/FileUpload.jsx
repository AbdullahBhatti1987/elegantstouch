// 'use client';

// import { useRef } from 'react';
// import { UploadCloud, X } from 'lucide-react';

// export default function FileUpload({
//   label,
//   name,
//   value = [],
//   onChange,
//   multiple = false,
//   accept = 'image/*',
// }) {
//   const inputRef = useRef(null);

//   const handleClick = () => {
//     inputRef.current.click();
//   };

//   const handleChange = (e) => {
//     const files = Array.from(e.target.files);

//     if (multiple) {
//       onChange(files);
//     } else {
//       onChange(files[0]);
//     }
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="mb-3 block font-medium">{label}</label>
//       )}

//       <div
//         onClick={handleClick}
//         className="relative flex min-h-[220px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-black dark:bg-gray-900"
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           name={name}
//           accept={accept}
//           multiple={multiple}
//           onChange={handleChange}
//           className="hidden"
//         />

//         {/* SINGLE IMAGE PREVIEW */}

//         {!multiple && value && (
//           <div className="relative h-full w-full">
//             <img
//               src={URL.createObjectURL(value)}
//               alt="preview"
//               className="h-[220px] w-full object-cover"
//             />

//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();
//                 onChange(null);
//               }}
//               className="absolute top-3 right-3 rounded-full bg-black p-2 text-white"
//             >
//               <X size={16} />
//             </button>
//           </div>
//         )}

//         {/* MULTIPLE IMAGE PREVIEW */}

//         {multiple && value.length > 0 && (
//           <div className="grid w-full grid-cols-3 gap-3 p-4">
//             {value.map((file, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt="preview"
//                   className="h-24 w-full rounded-lg object-cover"
//                 />

//                 <button
//                   type="button"
//                   onClick={(e) => {
//                     e.stopPropagation();

//                     const updated = value.filter(
//                       (_, i) => i !== index,
//                     );

//                     onChange(updated);
//                   }}
//                   className="absolute top-1 right-1 rounded-full bg-black p-1 text-white"
//                 >
//                   <X size={12} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* EMPTY STATE */}

//         {(!value || (multiple && value.length === 0)) && (
//           <div className="flex flex-col items-center justify-center text-center">
//             <div className="mb-3 rounded-full bg-gray-200 p-5 dark:bg-gray-800">
//               <UploadCloud size={40} className="text-gray-500" />
//             </div>

//             <p className="font-medium">Click to upload image</p>

//             <p className="mt-1 text-sm text-gray-500">
//               PNG, JPG up to 5MB
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useRef } from 'react';
import { UploadCloud, X, RefreshCw } from 'lucide-react';

export default function FileUpload({
  label,
  name,
  value = null,
  onChange,
  accept = 'image/*',
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      onChange(file);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-3 block text-sm font-medium">
          {label}
        </label>
      )}

      <div
        onClick={handleClick}
        className="group relative flex h-[260px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-black dark:border-gray-700 dark:bg-gray-900"
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        {/* IMAGE PREVIEW */}

        {value ? (
          <>
            <img
              src={URL.createObjectURL(value)}
              alt="preview"
              className="h-full w-full object-cover"
            />

            {/* Overlay */}

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black shadow">
                <RefreshCw size={18} />
                Change Image
              </div>
            </div>

            {/* Remove Button */}

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();

                onChange(null);
              }}
              className="absolute top-3 right-3 rounded-full bg-black p-2 text-white transition hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          /* EMPTY STATE */

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-gray-200 p-5 dark:bg-gray-800">
              <UploadCloud size={42} className="text-gray-500" />
            </div>

            <p className="font-medium">Upload Category Image</p>

            <p className="mt-1 text-sm text-gray-500">
              Click to browse image
            </p>

            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG, WEBP (Max 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
