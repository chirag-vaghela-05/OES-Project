"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";

import { cn } from "./utils";

// Menubar root
function Menubar({ className, children, ...props }) {
  return (
    <MenubarPrimitive.Root className={cn("flex gap-2", className)} {...props}>
      {children}
    </MenubarPrimitive.Root>
  );
}

// Menubar menu
function MenubarMenu({ children, ...props }) {
  return <MenubarPrimitive.Menu {...props}>{children}</MenubarPrimitive.Menu>;
}

// Menubar group
function MenubarGroup({ children, ...props }) {
  return <MenubarPrimitive.Group {...props}>{children}</MenubarPrimitive.Group>;
}

// Menubar portal
function MenubarPortal({ children, ...props }) {
  return <MenubarPrimitive.Portal {...props}>{children}</MenubarPrimitive.Portal>;
}

// Menubar radio group
function MenubarRadioGroup({ children, ...props }) {
  return <MenubarPrimitive.RadioGroup {...props}>{children}</MenubarPrimitive.RadioGroup>;
}

// Menubar trigger
function MenubarTrigger({ className, children, ...props }) {
  return (
    <MenubarPrimitive.Trigger className={cn("flex items-center px-2 py-1", className)} {...props}>
      {children}
      <ChevronRightIcon className="ml-2 h-4 w-4" />
    </MenubarPrimitive.Trigger>
  );
}

// Menubar content
function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  children,
  ...props
}) {
  return (
    <MenubarPrimitive.Content
      className={cn("z-50 min-w-[180px] rounded-md border bg-popover p-1 shadow-md", className)}
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      {...props}
    >
      {children}
    </MenubarPrimitive.Content>
  );
}

// Menubar item
function MenubarItem({ className, inset, variant = "default", children, ...props }) {
  return (
    <MenubarPrimitive.Item
      className={cn(
        "relative flex w-full select-none items-center rounded-sm px-2 py-1 text-sm outline-none cursor-pointer",
        variant === "destructive" && "text-destructive",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
    </MenubarPrimitive.Item>
  );
}

// Menubar checkbox item
function MenubarCheckboxItem({ className, children, checked, ...props }) {
  return (
    <MenubarPrimitive.CheckboxItem className={cn("relative flex w-full items-center px-2 py-1 text-sm", className)} checked={checked} {...props}>
      <MenubarPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
        <CheckIcon className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
}

// Menubar radio item
function MenubarRadioItem({ className, children, ...props }) {
  return (
    <MenubarPrimitive.RadioItem className={cn("relative flex w-full items-center px-2 py-1 text-sm", className)} {...props}>
      <MenubarPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
        <CircleIcon className="h-4 w-4" />
      </MenubarPrimitive.ItemIndicator>
      {children}
    </MenubarPrimitive.RadioItem>
  );
}

// Menubar label
function MenubarLabel({ className, inset, children, ...props }) {
  return (
    <MenubarPrimitive.Label className={cn("px-2 py-1 text-xs font-semibold text-muted-foreground", inset && "pl-8", className)} {...props}>
      {children}
    </MenubarPrimitive.Label>
  );
}

// Menubar separator
function MenubarSeparator({ className, ...props }) {
  return <MenubarPrimitive.Separator className={cn("my-1 h-px bg-border", className)} {...props} />;
}

// Menubar shortcut
function MenubarShortcut({ className, children, ...props }) {
  return (
    <span className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)} {...props}>
      {children}
    </span>
  );
}

// Menubar sub
function MenubarSub(props) {
  return <MenubarPrimitive.Sub {...props} />;
}

// Menubar sub trigger
function MenubarSubTrigger({ className, inset, children, ...props }) {
  return (
    <MenubarPrimitive.SubTrigger
      className={cn("flex w-full items-center px-2 py-1 text-sm", inset && "pl-8", className)}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
}

// Menubar sub content
function MenubarSubContent({ className, children, ...props }) {
  return (
    <MenubarPrimitive.SubContent
      className={cn("z-50 min-w-[180px] rounded-md border bg-popover p-1 shadow-md", className)}
      {...props}
    >
      {children}
    </MenubarPrimitive.SubContent>
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
