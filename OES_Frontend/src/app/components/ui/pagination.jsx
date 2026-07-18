import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "./utils";
import { Button, buttonVariants } from "./button";

// Pagination root
function Pagination({ className, children, ...props }) {
  return (
    <nav className={cn("flex items-center space-x-2", className)} {...props}>
      {children}
    </nav>
  );
}

// Pagination content wrapper
function PaginationContent({ className, children, ...props }) {
  return (
    <ul className={cn("flex items-center space-x-1", className)} {...props}>
      {children}
    </ul>
  );
}

// Pagination item wrapper
function PaginationItem({ children, ...props }) {
  return <li {...props}>{children}</li>;
}

// Pagination link
function PaginationLink({ className, isActive, size = "icon", children, ...props }) {
  return (
    <Button
      className={cn(
        buttonVariants({ variant: isActive ? "default" : "outline", size }),
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

// Pagination previous button
function PaginationPrevious({ className, ...props }) {
  return (
    <Button
      className={cn(buttonVariants({ variant: "outline", size: "icon" }), className)}
      {...props}
    >
      <ChevronLeftIcon className="h-4 w-4" />
      Previous
    </Button>
  );
}

// Pagination next button
function PaginationNext({ className, ...props }) {
  return (
    <Button
      className={cn(buttonVariants({ variant: "outline", size: "icon" }), className)}
      {...props}
    >
      Next
      <ChevronRightIcon className="h-4 w-4" />
    </Button>
  );
}

// Pagination ellipsis
function PaginationEllipsis({ className, ...props }) {
  return (
    <span className={cn("flex items-center px-2 text-muted-foreground", className)} {...props}>
      <MoreHorizontalIcon className="h-4 w-4" />
      More pages
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
