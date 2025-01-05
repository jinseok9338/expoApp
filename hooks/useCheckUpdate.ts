import { useState } from "react";
import * as Updates from "expo-updates";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { Linking } from "react-native";

interface UpdateCheckResult {
  isAvailable: boolean;
  version?: string;
}

export default function useCheckUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const currentVersion = Constants.expoConfig?.version ?? "1.0.0";
  const storeUrl =
    Platform.select({
      ios: "https://apps.apple.com/app/your-app-id",
      android: "https://play.google.com/store/apps/details?id=your.app.package",
    }) ?? "";

  const checkUpdates = async (): Promise<UpdateCheckResult> => {
    try {
      const update = await Updates.checkForUpdateAsync();
      setIsUpdateAvailable(update.isAvailable);
      return { isAvailable: update.isAvailable };
    } catch (error) {
      console.error("Error checking for updates:", error);
      return { isAvailable: false };
    }
  };

  const updateApp = async () => {
    try {
      setIsUpdating(true);
      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();
    } catch (error) {
      console.error("Error updating app:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const openStore = async () => {
    if (storeUrl) {
      await Linking.openURL(storeUrl);
    }
  };

  return {
    isUpdateAvailable,
    currentVersion,
    storeUrl,
    checkUpdates,
    updateApp,
    openStore,
    isUpdating,
  };
}
