"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

function ContextMenu(props) {
  return <ContextMenuPrimitive.Root {...props} />;
}

function ContextMenuTrigger(props) {
  return <ContextMenuPrimitive.Trigger {...props} />;
}

function ContextMenuGroup(props) {
  return <ContextMenuPrimitive.Group {...props} />;
}

function ContextMenuPortal(props) {
  return <ContextMenuPrimitive.Portal {...props} />;
}

function ContextMenuSub(props) {
  return <ContextMenuPrimitive.Sub {...props} />;
}

function ContextMenuRadioGroup(props) {
  return <ContextMenuPrimitive.RadioGroup {...props} />;
}

function ContextMenuSubTrigger({ className, inset, children, ...props }) {
  return (
    <ContextMenuPrimitive.SubTrigger
      className={cn(
        "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </ContextMenuPrimitive.SubTrigger>
  );
}

function ContextMenuSubContent({ className, ...props }) {
  return (
    <ContextMenuPrimitive.SubContent
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in slide-in-from-left-1",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuContent({ className, ...props }) {
  return (
    <ContextMenuPrimitive.Content
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuItem({ className, inset, variant = "default", ...props }) {
  return (
    <ContextMenuPrimitive.Item
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        variant === "destructive" && "text-destructive focus:text-destructive-foreground",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuCheckboxItem({ className, children, checked, ...props }) {
  return (
    <ContextMenuPrimitive.CheckboxItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        className
      )}
      checked={checked}
      {...props}
    >
      <ContextMenuPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
        <CheckIcon className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
      {children}
    </ContextMenuPrimitive.CheckboxItem>
  );
}

function ContextMenuRadioItem({ className, children, ...props }) {
  return (
    <ContextMenuPrimitive.RadioItem
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      <ContextMenuPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
        <CircleIcon className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
      {children}
    </ContextMenuPrimitive.RadioItem>
  );
}

function ContextMenuLabel({ className, inset, ...props }) {
  return (
    <ContextMenuPrimitive.Label
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-muted-foreground",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({ className, ...props }) {
  return (
    <ContextMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }) {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
