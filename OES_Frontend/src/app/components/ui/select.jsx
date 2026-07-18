"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { cn } from "./utils";

function Select(props) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup(props) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue(props) {
  return <SelectPrimitive.Value {...props} />;
}

function SelectTrigger({ className, size = "default", children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex items-center justify-between rounded-md border bg-white px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500",
        size === "sm" && "h-8 text-xs px-2",
        size === "default" && "h-10",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="ml-2 h-4 w-4" />
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ className, children, position = "popper", ...props }) {
  return (
    <SelectPrimitive.Content
      className={cn(
        "overflow-hidden rounded-md border bg-white shadow-md",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  );
}

function SelectLabel({ className, ...props }) {
  return (
    <SelectPrimitive.Label
      className={cn("px-3 py-1 text-sm font-semibold text-gray-700", className)}
      {...props}
    />
  );
}

function SelectItem({ className, children, ...props }) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex items-center px-3 py-2 text-sm text-gray-900 focus:bg-blue-100 focus:outline-none",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemIndicator className="absolute left-0 inline-flex w-5 items-center justify-center">
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
      {children}
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, ...props }) {
  return (
    <SelectPrimitive.Separator
      className={cn("my-1 h-px bg-gray-200", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn("flex items-center justify-center h-6 bg-gray-100", className)}
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, ...props }) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn("flex items-center justify-center h-6 bg-gray-100", className)}
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
