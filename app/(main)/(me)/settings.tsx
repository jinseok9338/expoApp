import React from "react";
import { View, Text, Pressable, Switch, Linking } from "react-native";
import { useTranslation } from "react-i18next";

import * as Notifications from "expo-notifications";

import Ionicons from "@expo/vector-icons/Ionicons";
import useCheckUpdate from "@/hooks/useCheckUpdate";

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { isUpdateAvailable, currentVersion, storeUrl } = useCheckUpdate();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  React.useEffect(() => {
    checkNotificationPermission();
  }, []);

  const checkNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setNotificationsEnabled(status === "granted");
  };

  const handleNotificationToggle = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();
      setNotificationsEnabled(newStatus === "granted");
      if (newStatus !== "granted") {
        // Open app settings if permission was denied
        await Linking.openSettings();
      }
    } else {
      // Here you would typically toggle notifications in your backend
      setNotificationsEnabled(!notificationsEnabled);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Notification Settings */}
        <View className="bg-white rounded-xl mb-4">
          <Pressable
            className="flex-row items-center justify-between p-4"
            onPress={handleNotificationToggle}
          >
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={24} color="#666" />
              <Text className="ml-3 text-gray-900">
                {t("settings.notifications.title")}
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationToggle}
            />
          </Pressable>
        </View>

        {/* App Permissions */}
        <View className="bg-white rounded-xl mb-4">
          <Pressable
            className="flex-row items-center justify-between p-4"
            onPress={() => Linking.openSettings()}
          >
            <View className="flex-row items-center">
              <Ionicons name="key-outline" size={24} color="#666" />
              <Text className="ml-3 text-gray-900">
                {t("settings.permissions.title")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </Pressable>
        </View>

        {/* App Version */}
        <View className="bg-white rounded-xl">
          <View className="p-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#666"
                />
                <Text className="ml-3 text-gray-900">
                  {t("settings.version.title")} {currentVersion}
                </Text>
              </View>
              {isUpdateAvailable && (
                <Pressable
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                  onPress={() => Linking.openURL(storeUrl)}
                >
                  <Text className="text-white font-medium">
                    {t("settings.update.title")}
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
