import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        <Text>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
}
