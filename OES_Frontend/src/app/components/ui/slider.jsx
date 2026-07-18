"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "./utils";

function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
  // Determine slider values
  const _values = React.useMemo(() => {
    if (Array.isArray(value)) return value;
    if (Array.isArray(defaultValue)) return defaultValue;
    return [min, max];
  }, [value, defaultValue, min, max]);

  return (
    <SliderPrimitive.Root
      className={cn("relative flex h-5 w-full touch-none select-none items-center", className)}
      min={min}
      max={max}
      defaultValue={defaultValue}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow rounded-full bg-gray-200">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-blue-500" />
      </SliderPrimitive.Track>

      {_values.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className="block h-5 w-5 rounded-full bg-white shadow"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
