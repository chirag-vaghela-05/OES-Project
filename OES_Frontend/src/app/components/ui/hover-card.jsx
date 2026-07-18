"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "./utils";

// HoverCard root
function HoverCard(props) {
  return <HoverCardPrimitive.Root {...props} />;
}

// HoverCard trigger
function HoverCardTrigger(props) {
  return <HoverCardPrimitive.Trigger {...props} />;
}

// HoverCard content
function HoverCardContent({ className, align = "center", sideOffset = 4, children, ...props }) {
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        className={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md animate-in fade-in-80",
          className
        )}
        align={align}
        sideOffset={sideOffset}
        {...props}
      >
        {children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
