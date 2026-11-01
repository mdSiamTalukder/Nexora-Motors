
"use client";

import { ThemeProvider as NextThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// Filter only the known React 19 / next-themes script warning in development.
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "development"
) {
  const originalConsoleError = console.error;

  console.error = (...args: unknown[]) => {
    const message = args[0];

    if (
      typeof message === "string" &&
      message.includes(
        "Encountered a script tag while rendering React component",
      )
    ) {
      return;
    }

    originalConsoleError.apply(console, args);
  };
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      attribute="data-theme"
      themes={["light", "dark"]}
      defaultTheme="light"
      enableSystem={false}
      storageKey="nexora-theme"
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
