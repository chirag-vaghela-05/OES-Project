"use client";

import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "./utils";

// NavigationMenu root
function NavigationMenu({ className, children, viewport = true, ...props }) {
  return (
    <NavigationMenuPrimitive.Root className={cn("relative z-10 flex", className)} {...props}>
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  );
}

// NavigationMenu list
function NavigationMenuList({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.List className={cn("flex list-none p-1", className)} {...props}>
      {children}
    </NavigationMenuPrimitive.List>
  );
}

// NavigationMenu item
function NavigationMenuItem({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Item className={cn("relative", className)} {...props}>
      {children}
    </NavigationMenuPrimitive.Item>
  );
}

// NavigationMenu trigger style using cva
const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:opacity-50 outline-none transition-all"
);

// NavigationMenu trigger
function NavigationMenuTrigger({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children} <ChevronDownIcon className="ml-1 h-4 w-4" />
    </NavigationMenuPrimitive.Trigger>
  );
}

// NavigationMenu content
function NavigationMenuContent({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Content
      className={cn("absolute top-full left-0 mt-2 w-56 rounded-md border bg-popover p-4 shadow-md", className)}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Content>
  );
}

// NavigationMenu viewport
function NavigationMenuViewport({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Viewport
      className={cn("absolute top-full left-0 mt-2 h-0 w-full overflow-hidden rounded-md bg-popover transition-all", className)}
      {...props}
    />
  );
}

// NavigationMenu link
function NavigationMenuLink({ className, children, ...props }) {
  return (
    <NavigationMenuPrimitive.Link
      className={cn("block w-full rounded-md px-2 py-1 text-sm outline-none hover:bg-accent hover:text-accent-foreground", className)}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Link>
  );
}

// NavigationMenu indicator
function NavigationMenuIndicator({ className, ...props }) {
  return (
    <NavigationMenuPrimitive.Indicator
      className={cn("absolute bottom-0 h-1 w-full bg-primary", className)}
      {...props}
    />
  );
}

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
