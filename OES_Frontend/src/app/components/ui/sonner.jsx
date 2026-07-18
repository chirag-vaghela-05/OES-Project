"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      {...props}
      richColors
      theme={theme === "system" ? "light" : theme}
      position="top-right"
    />
  );
};

export { Toaster };

