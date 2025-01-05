import { useState } from "react";
import { View, Text, Pressable, Image, Alert } from "react-native";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function MeScreen() {
  const { t } = useTranslation();
  const [imageUri, setImageUri] = useState("https://placeholder.com/150");

  const handleImageSelection = async () => {
    Alert.alert("Change Profile Picture", "Choose an option", [
      {
        text: "Take Photo",
        onPress: () => pickImage("camera"),
      },
      {
        text: "Choose from Gallery",
        onPress: () => pickImage("gallery"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const pickImage = async (source: "camera" | "gallery") => {
    try {
      // Request permissions
      if (source === "camera") {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            "Permission needed",
            "Camera permission is required to take photos"
          );
          return;
        }
      } else {
        const permission =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
          Alert.alert(
            "Permission needed",
            "Gallery permission is required to select photos"
          );
          return;
        }
      }

      // Launch camera or picker based on source
      const result =
        source === "camera"
          ? await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            })
          : await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 1,
            });

      if (!result.canceled) {
        // Compress and resize the image
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 500, height: 500 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        setImageUri(manipulatedImage.uri);
        // Here you would typically upload the image to your server
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image");
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <Pressable className="relative" onPress={handleImageSelection}>
            <Image
              source={{ uri: imageUri }}
              className="w-24 h-24 rounded-full"
            />
            <View className="absolute bottom-0 right-0 bg-brown-500 rounded-full p-2">
              <Ionicons name="pencil" size={20} color="white" />
            </View>
          </Pressable>
          <Text className="text-xl font-semibold mt-2">User Name</Text>
        </View>

        {/* Menu Items */}
        <View className="space-y-4">
          <Link href="/(main)/(me)/profile" asChild>
            <Pressable className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="person-outline" size={24} color="#666" />
                <Text className="ml-3">{t("me.your_profile.title")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </Pressable>
          </Link>

          <Link href="/(main)/(me)/settings" asChild>
            <Pressable className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="settings-outline" size={24} color="#666" />
                <Text className="ml-3">{t("me.settings.title")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </Pressable>
          </Link>

          <Link href="/(main)/(me)/help" asChild>
            <Pressable className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="help-circle-outline" size={24} color="#666" />
                <Text className="ml-3">{t("me.help_center.title")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </Pressable>
          </Link>

          <Link href="/(main)/(me)/privacy" asChild>
            <Pressable className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg">
              <View className="flex-row items-center">
                <Ionicons name="lock-closed-outline" size={24} color="#666" />
                <Text className="ml-3">{t("me.privacy_policy.title")}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#666" />
            </Pressable>
          </Link>

          <Pressable
            className="flex-row items-center justify-between p-4 bg-gray-50 rounded-lg"
            onPress={() => {
              // Add logout logic here
            }}
          >
            <View className="flex-row items-center">
              <Ionicons name="log-out-outline" size={24} color="#666" />
              <Text className="ml-3">{t("me.logout.title")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
