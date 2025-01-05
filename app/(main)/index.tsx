import { Box } from "@/components/ui";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { cn } from "@/lib/utils";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router"; // Ensure you have Expo Router installed
import { useTranslation } from "react-i18next";
import { Platform, Text, View } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const icons = [
    {
      icon: "barcode",
      label: t("main.navigation.barcode"),
      route: "/auth/login",
    }, // Barcode icon for text or scan
    {
      icon: "notifications",
      label: t("main.navigation.notifications"),
      route: "/auth/signUp",
    }, // Push notifications
    {
      icon: "cube",
      label: t("main.navigation.products"),
      route: "/(sub)/product-management",
    }, // Product management
    {
      icon: "people",
      label: t("main.navigation.customer-management"),
      route: "/(sub)/customer-management",
    }, // Customer management
    {
      icon: "hammer",
      label: t("main.navigation.installation-registration"),
      route: "/(sub)/installation-registration",
    }, // Installation registration
    {
      icon: "calendar",
      label: t("main.navigation.regular-checks"),
      route: "/(sub)/regular-checks",
    }, // Regular inspections
    {
      icon: "construct",
      label: t("main.navigation.as-processing"),
      route: "/(sub)/as-processing",
    }, // AS processing
    {
      icon: "megaphone",
      label: t("main.navigation.announcements"),
      route: "/(sub)/announcements",
    }, // Announcements
    {
      icon: "help-buoy",
      label: t("main.navigation.support-center"),
      route: "/(sub)/support-center",
    }, // Support center
  ] as const;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-wrap flex-row justify-center items-center gap-3 p-4">
        {icons.map((item, index) => (
          <Link href={item.route} key={item.route}>
            <Box
              className={cn(
                "flex size-32 flex-col items-center justify-center rounded-xl bg-white p-6",
                Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
              )}
            >
              <Ionicons
                name={item.icon}
                size={40}
                color={Colors[colorScheme.colorScheme ?? "light"].tint}
              />
              <Text className="text-center text-gray-700 text-sm mt-2">
                {item.label}
              </Text>
            </Box>
          </Link>
        ))}
      </View>
    </View>
  );
}
