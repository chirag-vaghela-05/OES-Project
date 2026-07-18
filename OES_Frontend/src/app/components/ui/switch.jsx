"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "./utils";

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out",
          "data-[state=checked]:translate-x-5"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
