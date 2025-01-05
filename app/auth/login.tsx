import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { Box } from "@/components/ui";
import { cn } from "@/lib/utils";

export const formSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "form.placeholder.email" })
    .email({ message: "form.message.emailFormatIncorrect" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "form.placeholder.password" })
    .min(8, { message: "form.message.minimumPasswordRequirement" }),
});

export default function LoginPage() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  const { t } = useTranslation();

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Login Data:", data);
    // Handle login logic here
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          {/* Top Image */}
          <Image
            source={require("@/assets/images/dolphin.png")} // Replace with your image path
            style={{ width: 200, height: 200 }}
            className="mb-6"
          />

          {/* Login Form */}
          <Box
            className={cn(
              "w-full max-w-sm rounded-2xl bg-white p-6",
              Platform.OS === "ios" ? "shadow-sm" : "shadow-lg"
            )}
          >
            {/* Email Input */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm mb-2">
                {t("common.label.email")}
              </Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder={t("form.placeholder.email")}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">
                  {t(errors.email.message ?? "form.common.error")}
                </Text>
              )}
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-gray-700 text-sm mb-2">
                {t("common.label.password")}
              </Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder={t("form.placeholder.password")}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {t(errors.password.message ?? "form.common.error")}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-blue-600 rounded-lg p-2 items-center"
            >
              <Text className="text-white text-lg">
                {t("common.button.login")}
              </Text>
            </TouchableOpacity>
            {/* Links */}
            <View className="flex-col mt-4 space-x-4">
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm">
                  {t("login.form.findId")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text className="text-blue-600 text-sm">
                  {t("login.form.findPassword")}
                </Text>
              </TouchableOpacity>
            </View>
          </Box>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
