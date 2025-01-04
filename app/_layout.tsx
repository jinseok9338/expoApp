import "@/global.css";

import queryClient from "@/api/client";
import { useColorScheme } from "@/hooks/useColorScheme";
import useLodaColorScheme from "@/hooks/useLoadColorScheme";
import { NAV_THEME } from "@/lib/constants";
import "@/translation/i18n";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "bold",
    },
    medium: {
      fontFamily: "",
      fontWeight: "bold",
    },
    bold: {
      fontFamily: "",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "",
      fontWeight: "bold",
    },
  },
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
  fonts: {
    regular: {
      fontFamily: "",
      fontWeight: "bold",
    },
    medium: {
      fontFamily: "",
      fontWeight: "bold",
    },
    bold: {
      fontFamily: "",
      fontWeight: "bold",
    },
    heavy: {
      fontFamily: "",
      fontWeight: "bold",
    },
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { isDarkColorScheme } = useColorScheme();
  const { isColorSchemeLoaded } = useLodaColorScheme();

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={LIGHT_THEME}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <Stack />
        <PortalHost />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
