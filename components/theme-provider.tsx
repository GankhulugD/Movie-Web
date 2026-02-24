"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Type-ийг "dist/types"-аас дуудахын оронд ингэж авах нь хамгийн найдвартай
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
