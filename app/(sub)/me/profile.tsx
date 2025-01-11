import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useForm, Controller } from "react-hook-form";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
}

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { control } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 234 567 8900",
      dateOfBirth: "1990-01-01",
      address: "123 Main St, City, Country",
    },
  });

  const renderField = (
    label: string,
    name: keyof ProfileFormData,
    icon: string
  ) => (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => (
        <View className="mb-4">
          <Text className="text-gray-600 mb-1 text-sm">{label}</Text>
          <View className="flex-row items-center bg-gray-50 rounded-lg px-3 py-2">
            <Ionicons
              name={icon as any}
              size={20}
              color="#666"
              className="mr-2"
            />
            <TextInput
              value={value}
              editable={false}
              className="flex-1 ml-2 text-gray-800"
              selectTextOnFocus={false}
            />
          </View>
        </View>
      )}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-semibold flex-1">
          {t("profile.title")}
        </Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="space-y-6">
          <View className="flex-row w-full space-x-4">
            <View className="flex-1">
              {renderField(
                t("profile.firstName"),
                "firstName",
                "person-outline"
              )}
            </View>
            <View className="flex-1">
              {renderField(t("profile.lastName"), "lastName", "person-outline")}
            </View>
          </View>

          {renderField(t("profile.email"), "email", "mail-outline")}

          {renderField(t("profile.phone"), "phone", "call-outline")}

          {renderField(
            t("profile.dateOfBirth"),
            "dateOfBirth",
            "calendar-outline"
          )}

          {renderField(t("profile.address"), "address", "location-outline")}

          <View className="h-6" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
