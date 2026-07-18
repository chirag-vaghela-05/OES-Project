"use client";

import * as React from "react";
import { cn } from "./utils";

function Table({ className, ...props }) {
  return (
    <table className={cn("min-w-full divide-y divide-gray-200", className)} {...props} />
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead className={cn("bg-gray-50", className)} {...props} />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody className={cn("bg-white divide-y divide-gray-200", className)} {...props} />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot className={cn("bg-gray-50", className)} {...props} />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr className={cn("hover:bg-gray-100", className)} {...props} />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      scope="col"
      className={cn(
        "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-900", className)}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption className={cn("text-sm text-gray-500", className)} {...props} />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
