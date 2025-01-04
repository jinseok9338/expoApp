import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";

export const formSchema = z
  .object({
    email: z
      .string()
      .email({ message: "유효한 이메일을 입력하세요." })
      .nonempty({ message: "이메일을 입력하세요." }),
    password: z
      .string()
      .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
      .nonempty({ message: "비밀번호를 입력하세요." }),
    confirmPassword: z.string(),
    //   .refine((value, ctx) => value === ctx.parent.password, {
    //     message: "비밀번호가 일치하지 않습니다.",
    //   })
    name: z.string().nonempty({ message: "이름을 입력하세요." }),
    birthDate: z.date({
      message: "생년월일을 선택하세요.",
    }),
    phoneNumber: z.string().nonempty({ message: "연락처를 입력하세요." }),
    dealership: z.string().nonempty({ message: "대리점을 선택하세요." }),
    startDate: z.date({
      message: "입사일을 선택하세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
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
      dealership: null,
      startDate: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
    Alert.alert("회원가입 완료", "회원가입이 성공적으로 완료되었습니다.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Form Title */}
        <Text className="text-2xl font-bold mb-6">회원가입</Text>

        {/* Email */}
        <View className="mb-4 w-full max-w-sm">
          <Text>이메일</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Write some stuff..."
                value={value}
                onChangeText={onChange}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </View>

        {/* Password */}
        <View className="mb-4 w-full max-w-sm">
          <Text>비밀번호</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Write some stuff..."
                value={value}
                onChangeText={onChange}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">
              {errors.password.message}
            </Text>
          )}
        </View>

        {/* Confirm Password */}
        <View className="mb-4 w-full max-w-sm">
          <Text>비밀번호 확인</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Write some stuff..."
                value={value}
                onChangeText={onChange}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {/* Name */}
        <View className="mb-4 w-full max-w-sm">
          <Text>이름</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Write some stuff..."
                value={value}
                onChangeText={onChange}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm">{errors.name.message}</Text>
          )}
        </View>

        {/* Confirm Password */}
        <View className="mb-4 w-full max-w-sm">
          <Text>비밀번호 확인</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder="Write some stuff..."
                value={value}
                onChangeText={onChange}
                aria-labelledby="inputLabel"
                aria-errormessage="inputError"
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-blue-600 rounded-lg p-3 items-center w-full max-w-sm"
        >
          <Text className="text-white text-lg">회원가입</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
