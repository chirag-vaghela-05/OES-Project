"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

function Dialog(props) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogTrigger(props) {
  return <DialogPrimitive.Trigger {...props} />;
}

function DialogPortal(props) {
  return <DialogPrimitive.Portal {...props} />;
}

function DialogClose(props) {
  return <DialogPrimitive.Close {...props} />;
}

function DialogOverlay({ className, ...props }) {
  return (
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({ className, children, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-md border bg-popover p-6 shadow-lg focus:outline-none",
          className
        )}
        {...props}
      >
        {children}
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
          <XIcon className="h-4 w-4" />
        </DialogClose>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
  );
}

function DialogFooter({ className, ...props }) {
  return (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
