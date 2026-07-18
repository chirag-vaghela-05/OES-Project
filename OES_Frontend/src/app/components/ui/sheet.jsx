"use client";

import * as React from "react";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

function Sheet(props) {
  return <SheetPrimitive.Root {...props} />;
}

function SheetTrigger(props) {
  return <SheetPrimitive.Trigger {...props} />;
}

function SheetClose(props) {
  return <SheetPrimitive.Close {...props} />;
}

function SheetPortal(props) {
  return <SheetPrimitive.Portal {...props} />;
}

function SheetOverlay({ className, ...props }) {
  return (
    <SheetPrimitive.Overlay
      className={cn(
        "fixed inset-0 bg-black/50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({ className, children, side = "right", ...props }) {
  const sideClass = {
    top: "top-0 left-0 w-full h-1/3",
    right: "top-0 right-0 h-full w-1/3",
    bottom: "bottom-0 left-0 w-full h-1/3",
    left: "top-0 left-0 h-full w-1/3",
  }[side];

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        className={cn(
          "fixed bg-white shadow-lg p-4",
          sideClass,
          className
        )}
        {...props}
      >
        {children}
        <SheetClose className="absolute top-2 right-2">
          <XIcon className="h-4 w-4" />
        </SheetClose>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-2", className)} {...props} />
  );
}

function SheetFooter({ className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-2 mt-4", className)} {...props} />
  );
}

function SheetTitle({ className, ...props }) {
  return (
    <SheetPrimitive.Title
      className={cn("text-lg font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({ className, ...props }) {
  return (
    <SheetPrimitive.Description
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
