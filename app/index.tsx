import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function LandingScreen() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // If still loading or user is authenticated, don't show landing page
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 items-center justify-center px-4">
        <View className="w-full max-w-sm items-center">
          <Image
            source={require("@/assets/images/dolphin.png")}
            style={{
              width: width * 0.8,
              height: width * 0.8,
              maxWidth: 300,
              maxHeight: 300,
            }}
            resizeMode="contain"
          />

          <Text className="text-3xl font-bold text-center mt-8 text-gray-900">
            Welcome to DolphinApp
          </Text>

          <Text className="text-base text-center mt-4 mb-8 text-gray-600">
            Your trusted companion for managing all your aquatic needs
          </Text>

          <View className="w-full space-y-4 flex-col gap-4">
            <Button
              onPress={() => router.push("/auth/signUp")}
              className="w-full bg-blue-600 rounded-xl "
            >
              <Text className="text-white font-semibold text-center text-lg">
                Get Started
              </Text>
            </Button>

            <Button
              onPress={() => router.push("/auth/login")}
              className="w-full bg-transparent border border-gray-300 rounded-xl "
            >
              <Text className="text-gray-900 font-semibold text-center text-lg">
                Sign In
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
