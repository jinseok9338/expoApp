import "@/global.css";

import queryClient from "@/api/client";
import { useColorScheme } from "@/hooks/useColorScheme";
import useLodaColorScheme from "@/hooks/useLoadColorScheme";
import { NAV_THEME } from "@/lib/constants";
import "@/translation/i18n";
import { Theme, ThemeProvider } from "@react-navigation/native";

import { QueryClientProvider } from "@tanstack/react-query";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/hooks/useAuth";
import { Toast } from "@/components/ui/toast";
import { toastConfig } from "@/components/ui/toast";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PaperProvider } from "react-native-paper";

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
  const { isLoading: isAuthLoading } = useAuth();

  if (!isColorSchemeLoaded || isAuthLoading) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <BottomSheetModalProvider>
          <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <QueryClientProvider client={queryClient}>
              <StatusBar style={isDarkColorScheme ? "light" : "dark"} />

              <Stack
                screenOptions={{
                  animation: "slide_from_right",
                }}
              />
              <Toast config={toastConfig} />
            </QueryClientProvider>
          </ThemeProvider>
        </BottomSheetModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
