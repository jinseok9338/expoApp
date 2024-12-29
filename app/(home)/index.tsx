import { Text } from "@/components/ui/text";
import useVersionCheck from "@/hooks/useCheckUpdate";
import { Button, View } from "react-native";
import * as Application from "expo-application";

export default function HomeScreen() {
  const {
    updateAvailable,
    newVersionAvailable,
    updateApp,
    openStore,
    isChecking,
  } = useVersionCheck();

  const handleStoreNavigation = async () => {
    try {
      await openStore();
    } catch (error) {
      console.error("Failed to open store:", error);
    }
  };

  return (
    <View>
      {isChecking ? (
        <Text>Checking for updates...</Text>
      ) : (
        <>
          <Button
            disabled={!updateAvailable}
            title="Update available! Click to update"
            onPress={updateApp}
          />
          <Button
            disabled={!newVersionAvailable}
            title="New version available in store!"
            onPress={handleStoreNavigation}
          />
          <Text className="text-red-700">
            Version: {Application.nativeApplicationVersion}
          </Text>
        </>
      )}
    </View>
  );
}
