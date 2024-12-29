import { useState, useEffect } from "react";
import * as Updates from "expo-updates";
import * as Application from "expo-application";
import { Platform, Linking } from "react-native";
import Constants, { ExecutionEnvironment } from "expo-constants";

const useVersionCheck = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [newVersionAvailable, setNewVersionAvailable] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isExpoGo =
    Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

  const checkForEASUpdate = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      return update.isAvailable;
    } catch (error) {
      console.error("Error checking for EAS update:", error);
      return false;
    }
  };

  const getStoreUrl = () => {
    return Platform.select({
      ios: `https://itunes.apple.com/lookup?bundleId=${Application.applicationId}`,
      android: `https://play.google.com/store/apps/details?id=${Application.applicationId}`,
      default: null,
    });
  };

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
        // Fallback to browser URL for Android if Play Store app isn't installed
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

  const fetchStoreVersion = async () => {
    try {
      const storeUrl = getStoreUrl();

      if (!storeUrl) {
        throw new Error("Unsupported platform for version checking");
      }

      const response = await fetch(storeUrl);

      if (Platform.OS === "ios") {
        const json = await response.json();
        return json.results[0]?.version;
      } else if (Platform.OS === "android") {
        const text = await response.text();
        const match = text.match(/Current Version.+?>([\d.]+)</);
        return match?.[1];
      }

      return null;
    } catch (error) {
      console.error("Error fetching store version:", error);
      return null;
    }
  };

  const compareVersions = (v1: string, v2: string) => {
    const parts1 = v1.split(".").map(Number);
    const parts2 = v2.split(".").map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const part1 = parts1[i] || 0;
      const part2 = parts2[i] || 0;
      if (part1 > part2) return 1;
      if (part1 < part2) return -1;
    }
    return 0;
  };

  const checkUpdates = async () => {
    setIsChecking(true);
    setError(null);

    try {
      if (isExpoGo) {
        setUpdateAvailable(false);
        setNewVersionAvailable(false);
        return;
      }

      // Check for EAS update
      const hasEASUpdate = await checkForEASUpdate();
      setUpdateAvailable(hasEASUpdate);

      // Check for store version
      const storeVersion = await fetchStoreVersion();
      const currentVersion = Application.nativeApplicationVersion;

      if (storeVersion && currentVersion) {
        setNewVersionAvailable(
          compareVersions(storeVersion, currentVersion) > 0
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setIsChecking(false);
    }
  };

  const updateApp = async () => {
    if (isExpoGo) {
      console.log("Updates are not available in Expo Go");
      return;
    }

    try {
      if (updateAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.error("Error updating app:", error);
      throw error;
    }
  };

  // Initial check on mount
  useEffect(() => {
    checkUpdates();
  }, []);

  return {
    updateAvailable,
    newVersionAvailable,
    updateApp,
    checkUpdates,
    isChecking,
    error,
    openStore,
    isExpoGo, // Expose this flag for UI handling
  };
};

export default useVersionCheck;
