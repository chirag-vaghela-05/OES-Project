"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "./utils";

// Progress root
function Progress({ className, value = 0, children, ...props }) {
  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative w-full overflow-hidden rounded-md bg-muted",
        className
      )}
      value={value}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-2 w-full bg-primary transition-all",
          className
        )}
        style={{ transform: `translateX(-${100 - value}%)` }}
      >
        {children}
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
