"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "./utils";

function Separator({ className, orientation = "horizontal", decorative = true, ...props }) {
  return (
    <SeparatorPrimitive.Root
      className={cn(
        orientation === "horizontal" ? "h-px w-full bg-gray-200" : "w-px h-full bg-gray-200",
        className
      )}
      orientation={orientation}
      decorative={decorative}
      {...props}
    />
  );
}

export { Separator };
