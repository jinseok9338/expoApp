import { Box } from "@/components/ui";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { Platform, Text, View, useWindowDimensions } from "react-native";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const numColumns = 3;
  const padding = 16;
  const containerWidth = width - padding * 2;
  const boxSize = (containerWidth - (numColumns - 1) * 12) / numColumns; // Account for gap between boxes

  const icons = [
    {
      icon: "barcode",
      label: t("main.navigation.barcode"),
      route: "/(sub)/scan",
    }, // Barcode icon for text or scan
    {
      icon: "notifications",
      label: t("main.navigation.notifications"),
      route: "/(sub)/notifications",
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

  const renderItem = ({ item }: { item: (typeof icons)[number] }) => (
    <Link
      href={item.route}
      key={item.route}
      style={{
        width: boxSize,
        padding: 6,
      }}
    >
      <Box
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          width: boxSize - 12, // Account for Link padding
          height: boxSize - 12,
          borderRadius: 12,
          ...Platform.select({
            ios: {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,
            },
            android: {
              elevation: 2,
            },
          }),
        }}
      >
        <Ionicons
          name={item.icon}
          size={32} // Reduced icon size to fit 3 columns better
          color={Colors[colorScheme.colorScheme ?? "light"].tint}
        />
        <Text className="text-center text-gray-700 text-xs mt-2">
          {item.label}
        </Text>
      </Box>
    </Link>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View className="flex-row flex-wrap p-4 justify-center">
        {icons.map((icon) => renderItem({ item: icon }))}
      </View>
    </View>
  );
}
