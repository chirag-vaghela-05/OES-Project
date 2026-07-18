import * as React from "react";
import { cn } from "./utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn(
        "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
