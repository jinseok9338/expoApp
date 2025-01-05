import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text>Privacy Policy Screen</Text>
      </View>
    </SafeAreaView>
  );
}