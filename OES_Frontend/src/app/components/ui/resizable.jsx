"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "./utils";

// Resizable Panel Group
function ResizablePanelGroup({ className, children, ...props }) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn("flex w-full h-full", className)}
      {...props}
    >
      {children}
    </ResizablePrimitive.PanelGroup>
  );
}

// Resizable Panel
function ResizablePanel({ className, children, ...props }) {
  return (
    <ResizablePrimitive.Panel
      className={cn("flex-1 overflow-auto", className)}
      {...props}
    >
      {children}
    </ResizablePrimitive.Panel>
  );
}

// Resizable Handle
function ResizableHandle({ withHandle = true, className, ...props }) {
  return (
    <ResizablePrimitive.ResizeHandle
      className={cn(
        "flex items-center justify-center w-2 bg-transparent cursor-col-resize",
        className
      )}
      {...props}
    >
      {withHandle && <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />}
    </ResizablePrimitive.ResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
