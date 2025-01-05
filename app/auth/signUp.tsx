import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
  Modal,
  Pressable,
} from "react-native";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { Picker } from "@react-native-picker/picker";
import { Button } from "@/components/ui";
import SingleDatePickerInput from "@/components/ui/datePicker/date-picker";
import { cn } from "@/lib/utils";

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: "signup.form.email-invalid" })
    .nonempty({ message: "signup.form.email-required" }),
  password: z
    .string()
    .min(8, { message: "signup.form.password-min" })
    .nonempty({ message: "signup.form.password-required" }),
  confirmPassword: z.string(),
  name: z.string().nonempty({ message: "signup.form.name-required" }),
  birthDate: z
    .string()
    .nonempty({ message: "signup.form.birthdate-required" })
    .refine((value) => dayjs(value, "YYYY-MM-DD").isValid(), {
      message: "signup.form.birthdate-invalid",
    }),
  phoneNumber: z.string().nonempty({ message: "signup.form.phone-required" }),
  dealership: z
    .string()
    .nonempty({ message: "signup.form.dealership-required" }),
  startDate: z
    .string()
    .nonempty({ message: "signup.form.startdate-required" })
    .refine((value) => dayjs(value, "YYYY-MM-DD").isValid(), {
      message: "signup.form.startdate-invalid",
    }),
});

export default function SignUpPage() {
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      birthDate: "",
      phoneNumber: "",
      dealership: "",
      startDate: "",
    },
  });

  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    Alert.alert(
      t("signup.form.success-title"),
      t("signup.form.success-message")
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingVertical: 32,
          paddingHorizontal: 16,
        }}
      >
        <View className="items-center mb-8">
          <Text className="text-3xl font-bold text-gray-900">
            {t("signup.form.title")}
          </Text>
          <Text className="mt-2 text-gray-600">
            {t("signup.form.subtitle")}
          </Text>
        </View>

        <View
          className={cn(
            "bg-white rounded-3xl p-6 mx-4",
            Platform.OS === "ios" ? "shadow-sm" : "shadow-xl"
          )}
        >
          {/* Email */}
          <View className="space-y-4 mb-6">
            <Text className="text-sm font-medium text-gray-700">
              {t("signup.form.email")}
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                  placeholder={t("signup.form.email-placeholder")}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm">
                {t(errors.email.message || "")}
              </Text>
            )}
          </View>

          {/* Password */}
          <View className="space-y-4 mb-6">
            <Text className="text-sm font-medium text-gray-700">
              {t("signup.form.password")}
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                  placeholder={t("signup.form.password-placeholder")}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm">
                {t(errors.password.message || "")}
              </Text>
            )}
          </View>

          {/* Confirm Password */}
          <View className="space-y-4 mb-6">
            <Text className="text-sm font-medium text-gray-700">
              {t("signup.form.confirm-password")}
            </Text>
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                  placeholder={t("signup.form.confirm-password-placeholder")}
                  value={value}
                  onChangeText={onChange}
                  secureTextEntry
                />
              )}
            />
            {errors.confirmPassword && (
              <Text className="text-red-500 text-sm">
                {t(errors.confirmPassword.message || "")}
              </Text>
            )}
          </View>

          {/* Name */}
          <View className="space-y-4 mb-6">
            <Text className="text-sm font-medium text-gray-700">
              {t("signup.form.name")}
            </Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200"
                  placeholder={t("signup.form.name-placeholder")}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.name && (
              <Text className="text-red-500 text-sm">
                {t(errors.name.message || "")}
              </Text>
            )}
          </View>

          {/* Birth Date */}
          <View className="space-y-4 mb-6">
            <Text className="text-sm font-medium text-gray-700">
              {t("signup.form.birthdate")}
            </Text>
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <SingleDatePickerInput
                  onChange={onChange}
                  value={value ? value : dayjs().format("YYYY-MM-DD")}
                  maxDate={dayjs().subtract(18, "years").toDate()}
                />
              )}
            />
            {errors.birthDate && (
              <Text className="text-red-500 text-sm">
                {t(errors.birthDate.message || "")}
              </Text>
            )}
          </View>

          {/* Dealership */}
          <View className="space-y-4 mb-6">
            <Text className="text-sm font-medium text-gray-700">
              {t("signup.form.dealership")}
            </Text>
            <Controller
              control={control}
              name="dealership"
              render={({ field: { onChange, value } }) => (
                <>
                  {Platform.OS === "ios" && (
                    <Pressable
                      onPress={() => setIsPickerVisible(true)}
                      className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
                    >
                      <Text className="text-gray-900">
                        {value
                          ? value.replace("dealership_", "Dealership ")
                          : t("signup.form.select-dealership")}
                      </Text>
                    </Pressable>
                  )}

                  {Platform.OS === "android" ? (
                    <View className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                      <Picker
                        selectedValue={value}
                        onValueChange={onChange}
                        style={{ backgroundColor: "transparent" }}
                      >
                        <Picker.Item
                          label={t("signup.form.select-dealership")}
                          value=""
                        />
                        <Picker.Item
                          label="Dealership A"
                          value="dealership_a"
                        />
                        <Picker.Item
                          label="Dealership B"
                          value="dealership_b"
                        />
                        <Picker.Item
                          label="Dealership C"
                          value="dealership_c"
                        />
                      </Picker>
                    </View>
                  ) : (
                    <Modal
                      visible={isPickerVisible}
                      transparent={true}
                      animationType="fade"
                    >
                      <View className="flex-1 justify-end bg-black/50">
                        <View className="bg-white w-full">
                          <View className="flex-row justify-end p-2 border-b border-gray-200">
                            <Pressable
                              onPress={() => setIsPickerVisible(false)}
                            >
                              <Text className="text-blue-600 font-semibold px-4 py-2">
                                Done
                              </Text>
                            </Pressable>
                          </View>
                          <Picker
                            selectedValue={value}
                            onValueChange={(itemValue) => {
                              onChange(itemValue);
                              setIsPickerVisible(false);
                            }}
                          >
                            <Picker.Item
                              label={t("signup.form.select-dealership")}
                              value=""
                            />
                            <Picker.Item
                              label="Dealership A"
                              value="dealership_a"
                            />
                            <Picker.Item
                              label="Dealership B"
                              value="dealership_b"
                            />
                            <Picker.Item
                              label="Dealership C"
                              value="dealership_c"
                            />
                          </Picker>
                        </View>
                      </View>
                    </Modal>
                  )}
                </>
              )}
            />
            {errors.dealership && (
              <Text className="text-red-500 text-sm">
                {t(errors.dealership.message || "")}
              </Text>
            )}
          </View>

          {/* Date Inputs */}
          <View className="space-y-6 mb-6">
            <View className="space-y-4">
              <Text className="text-sm font-medium text-gray-700">
                {t("signup.form.registration-date")}
              </Text>
              <Controller
                control={control}
                name="startDate"
                render={({ field: { onChange, value } }) => (
                  <SingleDatePickerInput
                    onChange={onChange}
                    value={value ? value : dayjs().format("YYYY-MM-DD")}
                  />
                )}
              />
            </View>
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            className="bg-blue-600 rounded-lg items-center w-full max-w-sm"
          >
            <Text className="text-white text-center font-semibold text-lg">
              {t("signup.form.submit")}
            </Text>
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
