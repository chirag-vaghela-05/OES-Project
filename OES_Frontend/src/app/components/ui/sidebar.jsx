"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { PanelLeftIcon } from "lucide-react";

import { useIsMobile } from "./use-mobile";
import { cn } from "./utils";
import { Button } from "./button";
import { Input } from "./input";
import { Separator } from "./separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet";
import { Skeleton } from "./skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

const SidebarContext = React.createContext(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

function SidebarProvider({ defaultOpen = true, open: openProp, onOpenChange, className, style, children, ...props }) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [_open, _setOpen] = React.useState(defaultOpen);

  const open = openProp ?? _open;

  const setOpen = React.useCallback((value) => {
    const openState = typeof value === "function" ? value(open) : value;
    if (onOpenChange) {
      onOpenChange(openState);
    } else {
      _setOpen(openState);
    }
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  }, [onOpenChange, open]);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((o) => !o);
    } else {
      setOpen((o) => !o);
    }
  }, [isMobile, setOpen, setOpenMobile]);

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const state = open ? "expanded" : "collapsed";

  const contextValue = React.useMemo(() => ({
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  }), [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]);

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

function Sidebar({ side = "left", variant = "sidebar", collapsible = "offcanvas", className, children, ...props }) {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === "none") {
    return <div className={className}>{children}</div>;
  }

  if (isMobile) {
    return (
      <Sheet>
        <SheetContent side={side}>
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return <div className={className}>{children}</div>;
}

function SidebarTrigger({ className, onClick, ...props }) {
  const { toggleSidebar } = useSidebar();
  return (
    <button
      className={className}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      Toggle Sidebar
    </button>
  );
}

// Example conversions for SidebarRail, SidebarInset, SidebarInput, SidebarHeader, SidebarFooter, etc.
function SidebarRail({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarInset({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarInput({ className, ...props }) {
  return <Input className={className} {...props} />;
}

function SidebarHeader({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarFooter({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarSeparator({ className, ...props }) {
  return <Separator className={className} {...props} />;
}

function SidebarContent({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarGroup({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarGroupLabel({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "div";
  return <Comp className={className} {...props} />;
}

function SidebarGroupAction({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={className} {...props} />;
}

function SidebarGroupContent({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarMenu({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarMenuItem({ className, ...props }) {
  return <div className={className} {...props} />;
}

// cva variants can remain as-is
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover-sidebar-accent hover-sidebar-accent-foreground focus-visible-2 active-sidebar-accent active-sidebar-accent-foreground disabled-events-none disabled-50",
  {
    variants: {
      variant: {
        default: "hover-sidebar-accent hover-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover-sidebar-accent hover-sidebar-accent-foreground",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function SidebarMenuButton({ asChild = false, isActive = false, variant = "default", size = "default", tooltip, className, ...props }) {
  const Comp = asChild ? Slot : "button";
  const { isMobile, state } = useSidebar();
  return <Comp className={className} {...props} />;
}

function SidebarMenuAction({ className, asChild = false, showOnHover = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={className} {...props} />;
}

function SidebarMenuBadge({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarMenuSkeleton({ className, showIcon = false, ...props }) {
  const width = React.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return <div className={className} style={{ width }} {...props}>{showIcon && <span>Icon</span>}</div>;
}

function SidebarMenuSub({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarMenuSubItem({ className, ...props }) {
  return <div className={className} {...props} />;
}

function SidebarMenuSubButton({ asChild = false, size = "md", isActive = false, className, ...props }) {
  const Comp = asChild ? Slot : "a";
  return <Comp className={className} {...props} />;
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
