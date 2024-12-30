import * as Updates from "expo-updates";
import * as Application from "expo-application";
import { Platform, Linking } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";
import { useState } from "react";

const useVersionCheck = () => {
  const { isUpdateAvailable } = Updates.useUpdates();
  const [isUpdating, setIsUpdating] = useState(false);

  const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

  const getStorePageUrl = () => {
    return Platform.select({
      ios: `https://apps.apple.com/app/id${Application.applicationId}`,
      android: `market://details?id=${Application.applicationId}`,
      default: null,
    });
  };

  const openStore = async () => {
    try {
      const url = getStorePageUrl();

      if (!url) {
        throw new Error("Unsupported platform for store navigation");
      }

      const canOpen = await Linking.canOpenURL(url);

      if (!canOpen) {
        if (Platform.OS === "android") {
          await Linking.openURL(
            `https://play.google.com/store/apps/details?id=${Application.applicationId}`
          );
          return;
        }
        throw new Error("Cannot open store URL");
      }

      await Linking.openURL(url);
    } catch (error) {
      console.error("Error opening store:", error);
      throw error;
    }
  };

  const updateApp = async () => {
    if (isExpoGo) {
      console.log("Updates are not available in Expo Go");
      return;
    }
    try {
      if (isUpdateAvailable) {
        setIsUpdating(true);
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating app:", error);
      throw error;
    }
  };

  return {
    isUpdateAvailable,
    updateApp,
    checkUpdates: Updates.checkForUpdateAsync,
    openStore,
    isExpoGo,
    isUpdating,
  };
};

export default useVersionCheck;
