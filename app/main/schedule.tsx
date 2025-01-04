import { Text } from "@/components/ui/text";
import useVersionCheck from "@/hooks/useCheckUpdate";
import { Button, View } from "react-native";
import * as Application from "expo-application";

export default function ScheduleScreen() {
  const { updateApp, isUpdateAvailable } = useVersionCheck();

  return (
    <View>
      <>
        <Button
          disabled={!isUpdateAvailable}
          title="Update available! Click to update"
          onPress={updateApp}
        />

        <Text className="text-red-700">
          Version: {Application.nativeApplicationVersion}
        </Text>
      </>
    </View>
  );
}
