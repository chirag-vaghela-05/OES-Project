"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";

import { cn } from "./utils";

// RadioGroup root
function RadioGroup({ className, children, ...props }) {
  return (
    <RadioGroupPrimitive.Root
      className={cn("flex flex-col space-y-2", className)}
      {...props}
    >
      {children}
    </RadioGroupPrimitive.Root>
  );
}

// RadioGroup item
function RadioGroupItem({ className, children, ...props }) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        "relative flex h-4 w-4 items-center justify-center rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <CircleIcon className="h-2 w-2 fill-current text-primary" />
      </RadioGroupPrimitive.Indicator>
      {children}
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
