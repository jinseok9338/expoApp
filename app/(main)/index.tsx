import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router"; // Ensure you have Expo Router installed
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

export default function HomeScreen() {
  const router = useRouter(); // Used for navigation
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
      <View className="flex-wrap flex-row justify-center items-center p-4">
        {icons.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            className="w-1/3 p-2 flex justify-center items-center"
          >
            <Ionicons
              name={item.icon}
              size={40}
              color={Colors[colorScheme.colorScheme ?? "light"].tint}
            />
            <Text className="text-center text-gray-700 text-sm mt-2">
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
