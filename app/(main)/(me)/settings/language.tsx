import React from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LanguageScreen() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const currentLanguage = i18n.language;

  const languages = [
    { code: "en", name: "English" },
    { code: "ko", name: "한국어" },
  ];

  const handleLanguageChange = async (languageCode: string) => {
    await i18n.changeLanguage(languageCode);
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="bg-white rounded-xl">
          {languages.map((language) => (
            <Pressable
              key={language.code}
              className="flex-row items-center justify-between p-4 border-b border-gray-100"
              onPress={() => handleLanguageChange(language.code)}
            >
              <Text className="text-gray-900">{language.name}</Text>
              {currentLanguage === language.code && (
                <Ionicons name="checkmark" size={24} color="#2563eb" />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
