import { View, Image } from "react-native";
import { Redirect } from "expo-router";
import { useEffect } from "react";
import UpdateProgress from "../components/splash/startUp";
import useVersionCheck from "@/hooks/useCheckUpdate";

export default function StartUpScreen() {
  const { isUpdating, isUpdateAvailable, updateApp } = useVersionCheck();

  useEffect(() => {
    if (isUpdateAvailable) {
      updateApp();
    }
  }, [isUpdateAvailable, updateApp]);

  if (!isUpdateAvailable) {
    return <Redirect href="/main" />;
  }

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 h-fullr justify-center items-center">
        <Image
          source={{
            uri: "https://img.freepik.com/premium-vector/bird-colorful-logo-gradient-vector_1131634-35.jpg",
          }}
          className="w-60 h-32"
        />
      </View>

      {isUpdating && <UpdateProgress />}
    </View>
  );
}
