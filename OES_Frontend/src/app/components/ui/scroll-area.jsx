"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "./utils";

function ScrollArea({ className, children, ...props }) {
  return (
    <ScrollAreaPrimitive.Root className={cn("overflow-hidden", className)} {...props}>
      <ScrollAreaPrimitive.Viewport>{children}</ScrollAreaPrimitive.Viewport>
    </ScrollAreaPrimitive.Root>
  );
}

function ScrollBar({ className, orientation = "vertical", ...props }) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" ? "w-2.5" : "h-2.5",
        className
      )}
      orientation={orientation}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-gray-400" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
}

export { ScrollArea, ScrollBar };
