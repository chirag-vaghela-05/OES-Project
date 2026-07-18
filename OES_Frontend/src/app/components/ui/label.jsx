"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";

import { cn } from "./utils";

function Label({ className, children, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    >
      {children}
    </LabelPrimitive.Root>
  );
}

export { Label };
