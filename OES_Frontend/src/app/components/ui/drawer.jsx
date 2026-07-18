"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "./utils";

function Drawer(props) {
  return <DrawerPrimitive {...props} />;
}

function DrawerTrigger(props) {
  return <DrawerPrimitive.Trigger {...props} />;
}

function DrawerPortal(props) {
  return <DrawerPrimitive.Portal {...props} />;
}

function DrawerClose(props) {
  return <DrawerPrimitive.Close {...props} />;
}

function DrawerOverlay({ className, ...props }) {
  return (
    <DrawerPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function DrawerContent({ className, children, ...props }) {
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-full max-w-xs bg-popover p-6 shadow-lg focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
        <DrawerClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          ✕
        </DrawerClose>
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-2 text-left", className)}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }) {
  return (
    <div
      className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
      {...props}
    />
  );
}

function DrawerTitle({ className, ...props }) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function DrawerDescription({ className, ...props }) {
  return (
    <p
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
