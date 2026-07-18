"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

// Main OTP input component
function InputOTP({ className, containerClassName, ...props }) {
  return (
    <OTPInput
      className={cn("inline-flex items-center", className)}
      containerClassName={cn("flex gap-2", containerClassName)}
      {...props}
    />
  );
}

// OTP Group wrapper
function InputOTPGroup({ className, children, ...props }) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  );
}

// Individual OTP input slot
function InputOTPSlot({ index, className, ...props }) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots?.[index] ?? {};

  return (
    <div
      className={cn(
        "relative w-8 h-10 border rounded-md text-center text-lg font-medium",
        isActive && "border-primary",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-primary" />
      )}
    </div>
  );
}

// OTP separator (optional)
function InputOTPSeparator(props) {
  return (
    <span className="mx-1 text-muted-foreground" {...props}>
      <MinusIcon className="h-4 w-4" />
    </span>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
