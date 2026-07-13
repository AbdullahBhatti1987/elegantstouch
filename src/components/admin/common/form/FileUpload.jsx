// 'use client';

// import { useRef } from 'react';
// import { UploadCloud, X, RefreshCw } from 'lucide-react';

// export default function FileUpload({
//   label,
//   name,
//   value = null,
//   onChange,
//   accept = 'image/*',
// }) {
//   const inputRef = useRef(null);

//   const handleClick = () => {
//     inputRef.current.click();
//   };

//   const handleChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       onChange(file);
//     }
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="mb-3 block text-sm font-medium">
//           {label}
//         </label>
//       )}

//       <div
//         onClick={handleClick}
//         className="group relative flex h-[260px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-black dark:border-gray-700 dark:bg-gray-900"
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           name={name}
//           accept={accept}
//           onChange={handleChange}
//           className="hidden"
//         />

//         {/* IMAGE PREVIEW */}

//         {value ? (
//           <>
//             <img
//               src={URL.createObjectURL(value)}
//               alt="preview"
//               className="h-full w-full object-cover"
//             />

//             {/* Overlay */}

//             <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
//               <div className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black shadow">
//                 <RefreshCw size={18} />
//                 Change Image
//               </div>
//             </div>

//             {/* Remove Button */}

//             <button
//               type="button"
//               onClick={(e) => {
//                 e.stopPropagation();

//                 onChange(null);
//               }}
//               className="absolute top-3 right-3 rounded-full bg-black p-2 text-white transition hover:bg-red-600"
//             >
//               <X size={16} />
//             </button>
//           </>
//         ) : (
//           /* EMPTY STATE */

//           <div className="flex flex-col items-center text-center">
//             <div className="mb-4 rounded-full bg-gray-200 p-5 dark:bg-gray-800">
//               <UploadCloud size={42} className="text-gray-500" />
//             </div>

//             <p className="font-medium">Upload Category Image</p>

//             <p className="mt-1 text-sm text-gray-500">
//               Click to browse image
//             </p>

//             <p className="mt-2 text-xs text-gray-400">
//               PNG, JPG, WEBP (Max 5MB)
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useRef, useEffect, useState } from 'react';
// import { UploadCloud, X, RefreshCw } from 'lucide-react';

// export default function FileUpload({
//   label,
//   name,
//   value = null,
//   onChange,
//   accept = 'image/*',
// }) {
//   const inputRef = useRef(null);
//   const [preview, setPreview] = useState(null);

//   useEffect(() => {
//     if (!value) {
//       setPreview(null);
//       return;
//     }

//     const url = URL.createObjectURL(value);

//     setPreview(url);

//     return () => {
//       URL.revokeObjectURL(url);
//     };
//   }, [value]);

//   const handleClick = () => {
//     inputRef.current.click();
//   };

//   const handleChange = (e) => {
//     const file = e.target.files[0];

//     if (!file) return;

//     // 5MB validation
//     if (file.size > 5 * 800 * 800) {
//       alert('Image size must be less than 5MB');

//       return;
//     }

//     onChange(file);
//   };

//   const removeImage = (e) => {
//     e.stopPropagation();

//     onChange(null);

//     if (inputRef.current) {
//       inputRef.current.value = '';
//     }
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="mb-3 block text-sm font-medium">
//           {label}
//         </label>
//       )}

//       <div
//         onClick={handleClick}
//         className="group relative flex h-[260px] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-black dark:border-gray-700 dark:bg-gray-900"
//       >
//         <input
//           ref={inputRef}
//           type="file"
//           name={name}
//           accept={accept}
//           onChange={handleChange}
//           className="hidden"
//         />

//         {preview ? (
//           <>
//             <img
//               src={preview}
//               alt="preview"
//               className="h-full w-full object-cover"
//             />

//             <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
//               <div className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black shadow">
//                 <RefreshCw size={18} />
//                 Change Image
//               </div>
//             </div>

//             <button
//               type="button"
//               onClick={removeImage}
//               className="absolute top-3 right-3 rounded-full bg-black p-2 text-white transition hover:bg-red-600"
//             >
//               <X size={16} />
//             </button>
//           </>
//         ) : (
//           <div className="flex flex-col items-center text-center">
//             <div className="mb-4 rounded-full bg-gray-200 p-5 dark:bg-gray-800">
//               <UploadCloud size={42} className="text-gray-500" />
//             </div>

//             <p className="font-medium">Upload Category Image</p>

//             <p className="mt-1 text-sm text-gray-500">
//               Click to browse image
//             </p>

//             <p className="mt-2 text-xs text-gray-400">
//               PNG, JPG, WEBP (Max 5MB)
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

'use client';

import { useRef, useEffect, useState } from 'react';
import { UploadCloud, X, RefreshCw, Loader2 } from 'lucide-react';

export default function FileUpload({
  label,
  name,
  value = null,
  onChange,
  accept = 'image/*',
  loading = false,
  error = '',
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  // useEffect(() => {
  //   if (!value) {
  //     setPreview(null);
  //     return;
  //   }

  //   const url = URL.createObjectURL(value);

  //   setPreview(url);

  //   return () => {
  //     URL.revokeObjectURL(url);
  //   };
  // }, [value]);

  // useEffect(() => {
  //   if (!value) {
  //     setPreview(null);
  //     return;
  //   }

  //   // Existing image URL
  //   if (typeof value === 'string') {
  //     setPreview(value);
  //     return;
  //   }

  //   // New uploaded file
  //   const url = URL.createObjectURL(value);

  //   setPreview(url);

  //   return () => {
  //     URL.revokeObjectURL(url);
  //   };
  // }, [value]);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === 'string') {
      setPreview(value);
    } else {
      const objectUrl = URL.createObjectURL(value);

      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleClick = () => {
    if (loading || disabled) return;

    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // File type validation
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image');
      return;
    }

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size must be less than 5MB');
      return;
    }

    onChange(file);
  };

  const removeImage = (e) => {
    e.stopPropagation();

    onChange(null);

    if (inputRef.current) {
      inputRef.current.value = '';
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
        className={`group relative flex h-[260px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-gray-50 transition dark:bg-gray-900 ${
          error
            ? 'border-red-500'
            : 'border-gray-300 hover:border-black dark:border-gray-700'
        } ${
          loading || disabled
            ? 'cursor-not-allowed opacity-70'
            : 'cursor-pointer'
        } `}
      >
        <input
          ref={inputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleChange}
          disabled={loading || disabled}
          className="hidden"
        />

        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2
              size={40}
              className="animate-spin text-gray-500"
            />

            <p className="text-sm text-gray-500">
              Uploading image...
            </p>
          </div>
        ) : preview ? (
          <>
            <img
              src={preview}
              alt="preview"
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-medium text-black shadow">
                <RefreshCw size={18} />
                Change Image
              </div>
            </div>

            <button
              type="button"
              onClick={removeImage}
              className="absolute top-3 right-3 rounded-full bg-black p-2 text-white transition hover:bg-red-600"
            >
              <X size={16} />
            </button>
          </>
        ) : (
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

      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
