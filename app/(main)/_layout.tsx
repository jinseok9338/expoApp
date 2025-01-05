import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTranslation } from "react-i18next";
import TabBarBackground from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme.colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("bottom.navigation.home"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: t("bottom.navigation.schedule"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: t("bottom.navigation.products"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: t("bottom.navigation.me"),
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="person" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="appointments/[id]"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="appointments/[id]/edit"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(me)/profile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(me)/settings"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(me)/help"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="(me)/privacy"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
