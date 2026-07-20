'use client';

import { Range } from 'react-range';

const DEFAULT_STEP = 100;
const DEFAULT_MIN = 99;
const DEFAULT_MAX = 9999;

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
    if (max <= min) return 0;

    const left = ((values[0] - min) / (max - min)) * 100;

    return Math.min(Math.max(left, 0), 100);
  };
  const getWidth = () => {
    if (max <= min) return 0;

    const width = ((values[1] - values[0]) / (max - min)) * 100;

    return Math.min(Math.max(width, 0), 100);
  };

  return (
    <aside className="sticky top-24 w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
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
        <span>Rs {formatPrice(values[0])}</span>

        <span className="text-gray-400">-</span>

        <span>Rs {formatPrice(values[1])}</span>
      </div>

      {/* Slider */}

      <div className="px-2">
        <Range
          values={values}

          step={step}

          min={min}

          max={max}

          onChange={(newValues) => {
            setValues(newValues.map(Math.round));
          }}

          renderTrack={({ props, children }) => {
            const { key, ...rest } = props;

            return (
              <div
                key={key}

                {...rest}

                className="relative h-2 w-full rounded-full bg-gray-300 dark:bg-zinc-700"
              >
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

          renderThumb={({ props, index }) => {
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
