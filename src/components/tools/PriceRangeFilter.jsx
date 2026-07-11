"use client";

import { useState } from "react";
import { Range } from "react-range";

const STEP = 50;
const MIN = 100;
const MAX = 5000;

export default function PriceRangeFilter() {
  const [values, setValues] = useState([500, 2000]);

  return (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
        Price Range
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        Rs {values[0]} - Rs {values[1]}
      </p>

      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(vals) => setValues(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="h-2 w-full bg-gray-300 dark:bg-zinc-700 rounded-full"
            style={{ ...props.style }}
          >
            <div
              className="h-2 bg-black dark:bg-white rounded-full"
              style={{
                position: "absolute",
                left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="h-5 w-5 bg-white border-2 border-black dark:border-white rounded-full shadow"
          />
        )}
      />
    </div>
  );
}