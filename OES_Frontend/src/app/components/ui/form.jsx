"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";

import { cn } from "./utils";
import { Label } from "./label";

// FormProvider alias
const Form = FormProvider;

// Contexts
const FormFieldContext = React.createContext({});
const FormItemContext = React.createContext({});

// FormField component
function FormField({ name, children, ...props }) {
  return (
    <FormFieldContext.Provider value={{ name }} {...props}>
      {children}
    </FormFieldContext.Provider>
  );
}

// Hook to access field state
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within FormField");
  }

  const { id } = itemContext || {};

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

// FormItem component
function FormItem({ className, children, ...props }) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }} {...props}>
      <div className={cn("flex flex-col space-y-1", className)}>{children}</div>
    </FormItemContext.Provider>
  );
}

// FormLabel component
function FormLabel({ className, ...props }) {
  const { error, formItemId } = useFormField();

  return (
    <Label htmlFor={formItemId} className={cn("text-sm font-medium", className)} {...props} />
  );
}

// FormControl component
function FormControl({ children, ...props }) {
  const { formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <div id={formItemId} aria-describedby={formDescriptionId} {...props}>
      {children}
    </div>
  );
}

// FormDescription component
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();

  return (
    <p id={formDescriptionId} className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

// FormMessage component
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : null;

  if (!body) return null;

  return (
    <p id={formMessageId} className={cn("text-sm font-medium text-destructive", className)} {...props}>
      {body}
    </p>
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
