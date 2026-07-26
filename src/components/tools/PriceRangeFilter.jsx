'use client';

import { Range } from 'react-range';

export default function PriceRangeFilter({
  values,
  setValues,
  min,
  max,
  step,
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PK').format(price);
  };
  const sliderMax = Math.ceil(max / step) * step;

  const normalizeValue = (value) => {
    const result = Math.round((value - min) / step) * step + min;

    return Math.min(Math.max(result, min), sliderMax);
  };

  const safeValues = [
    normalizeValue(values[0]),
    normalizeValue(values[1]),
  ];
  // Make max compatible with step

  // Prevent react-range values conflict
  // const safeValues = [
  //   Math.max(min, Math.min(values[0], sliderMax)),
  //   Math.max(min, Math.min(values[1], sliderMax)),
  // ];

  const getLeft = () => {
    if (sliderMax <= min) return 0;

    const left = ((safeValues[0] - min) / (sliderMax - min)) * 100;

    return Math.min(Math.max(left, 0), 100);
  };

  const getWidth = () => {
    if (sliderMax <= min) return 0;

    const width =
      ((safeValues[1] - safeValues[0]) / (sliderMax - min)) * 100;

    return Math.min(Math.max(width, 0), 100);
  };

  return (
    <aside className="sticky w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Price Range
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Select your preferred price
        </p>
      </div>

      {/* Selected Price */}
      <div className="mb-8 flex items-center justify-between rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-700 dark:bg-zinc-800 dark:text-gray-200">
        <span>Rs {formatPrice(safeValues[0])}</span>

        <span className="text-gray-400">-</span>

        <span>Rs {formatPrice(safeValues[1])}</span>
      </div>

      {/* Slider */}
      <div className=" px-2">
        <Range
          values={safeValues}
          step={step}
          min={min}
          max={sliderMax}
          draggableTrack={false}
          onChange={(newValues) => {
            setValues(newValues);
          }}

          renderTrack={({ props, children }) => {
            const { key, ...rest } = props;

            return (
              <div
                key={key}
                {...rest}
                className="relative h-2 w-full rounded-full bg-gray-300 dark:bg-zinc-700"
              >
                {/* Active Range */}
                <div
                  className="absolute top-0 h-2 rounded-full bg-black dark:bg-white"
                  style={{
                    left: `${getLeft()}%`,
                    width: `${getWidth()}%`,
                  }}
                />

                {children}
              </div>
            );
          }}

          renderThumb={({ props }) => {
            const { key, ...rest } = props;

            return (
              <div
                key={key}
                {...rest}
                className="flex h-5 w-5 cursor-grab items-center justify-center rounded-full border-2 border-black bg-white shadow-md dark:border-white"
              />
            );
          }}
        />
      </div>

      {/* Min Max Labels */}
      <div className="mt-5 flex justify-between text-xs text-gray-400">
        <span>Rs {formatPrice(min)}</span>

        <span>Rs {formatPrice(max)}</span>
      </div>
    </aside>
  );
}
