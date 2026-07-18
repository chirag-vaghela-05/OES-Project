"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";

import { cn } from "./utils";
import { toggleVariants } from "./toggle";

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
});

function ToggleGroup({ className, variant, size, children, ...props }) {
  return (
    <ToggleGroupContext.Provider value={{ variant, size }}>
      <ToggleGroupPrimitive.Root
        className={cn("inline-flex rounded-md bg-gray-100 p-1", className)}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Root>
    </ToggleGroupContext.Provider>
  );
}

function ToggleGroupItem({ className, children, variant, size, ...props }) {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      className={cn(
        "px-3 py-1 rounded-md bg-white text-sm text-gray-700 shadow-sm hover:bg-gray-200",
        toggleVariants({ variant: variant || context.variant, size: size || context.size }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
