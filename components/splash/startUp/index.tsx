import React from "react";
import { View, Text } from "react-native";

export default function UpdateProgress() {
  return (
    <View className="absolute bottom-0 w-full h-24 items-center">
      <View className="w-80 gap-2">
        <Text className="text-sm text-green-600">{`Updating App`}</Text>
        <View className="w-full h-1 rounded bg-gray-200">
          <View
            className="h-1 rounded bg-green-600 transition-all duration-300 ease-in-out"
            style={{ width: `100%` }}
          />
        </View>
      </View>
    </View>
  );
}
