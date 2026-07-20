// "use client";

// import { useState } from "react";
// import { Range } from "react-range";

// const STEP = 50;
// const MIN = 0;
// const MAX = 999999;

// export default function PriceRangeFilter() {
//   const [values, setValues] = useState([0, 999999]);

//   return (
//     <div className="mb-6">
//       <h3 className="font-semibold text-gray-700 dark:text-gray-300">
//         Price Range
//       </h3>

//       <p className="text-sm text-gray-500 mb-4">
//         Rs {values[0]} - Rs {values[1]}
//       </p>

//       <Range
//         values={values}
//         step={STEP}
//         min={MIN}
//         max={MAX}
//         onChange={(vals) => setValues(vals)}
//         renderTrack={({ props, children }) => (
//           <div
//             {...props}
//             className="h-2 w-full bg-gray-300 dark:bg-zinc-700 rounded-full"
//             style={{ ...props.style }}
//           >
//             <div
//               className="h-2 bg-black dark:bg-white rounded-full"
//               style={{
//                 position: "absolute",
//                 left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
//                 width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
//               }}
//             />
//             {children}
//           </div>
//         )}
//         renderThumb={({ props }) => (
//           <div
//             {...props}
//             className="h-5 w-5 bg-white border-2 border-black dark:border-white rounded-full shadow"
//           />
//         )}
//       />
//     </div>
//   );
// }

'use client';

import { Range } from 'react-range';

const DEFAULT_STEP = 100;
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 999999;

export default function PriceRangeFilter({
  values,
  setValues,
  min = DEFAULT_MIN,
  max = DEFAULT_MAX,
  step = DEFAULT_STEP,
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK').format(price);
  };

  const getLeft = () => {
    return ((values[0] - min) / (max - min)) * 100;
  };

  const getWidth = () => {
    return ((values[1] - values[0]) / (max - min)) * 100;
  };

  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}

      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Price Range
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Select your preferred price
        </p>
      </div>

      {/* Price Display */}

      <div className="mb-6 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
        <span>Rs {formatPrice(values[0])}</span>

        <span className="text-gray-400">-</span>

        <span>Rs {formatPrice(values[1])}</span>
      </div>

      {/* Slider */}

      <Range
        values={values}
        step={step}
        min={min}
        max={max}
        onChange={(newValues) => setValues(newValues)}

        renderTrack={({ props, children }) => {
          const { key, ...trackProps } = props;

          return (
            <div
              key={key}
              {...trackProps}
              className="relative h-2 w-full rounded-full bg-gray-200 dark:bg-zinc-700"
              style={{
                ...trackProps.style,
              }}
            >
              <div
                className="absolute h-2 rounded-full bg-black dark:bg-white"
                style={{
                  left: `${getLeft()}%`,
                  width: `${getWidth()}%`,
                }}
              />

              {children}
            </div>
          );
        }}

        renderThumb={({ props, index }) => {
          const { key, ...thumbProps } = props;

          return (
            <div
              key={key || index}
              {...thumbProps}
              className="h-5 w-5 cursor-pointer rounded-full border-2 border-black bg-white shadow-md transition hover:scale-110 dark:border-white"
            />
          );
        }}
      />

      {/* Range Labels */}

      <div className="mt-4 flex justify-between text-xs text-gray-400">
        <span>Rs {formatPrice(min)}</span>

        <span>Rs {formatPrice(max)}</span>
      </div>
    </aside>
  );
}
