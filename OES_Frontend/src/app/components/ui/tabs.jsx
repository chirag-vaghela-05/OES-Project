"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "./utils";

function Tabs({ className, ...props }) {
  return (
    <TabsPrimitive.Root className={cn("flex flex-col", className)} {...props} />
  );
}

function TabsList({ className, ...props }) {
  return (
    <TabsPrimitive.List
      className={cn("flex border-b border-gray-200", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        "px-4 py-2 text-sm font-medium text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-500",
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }) {
  return (
    <TabsPrimitive.Content
      className={cn("mt-2", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
