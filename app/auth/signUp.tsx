import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

import DateRangePickerInput from "@/components/ui/date-range-picker/date-range-picker";
import SingleDatePickerInput from "@/components/ui/datePicker/date-picker";
import MultiDatePickerInput from "@/components/ui/datePicker/multiple-date-picker";

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: "유효한 이메일을 입력하세요." })
    .nonempty({ message: "이메일을 입력하세요." }),
  password: z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .nonempty({ message: "비밀번호를 입력하세요." }),
  confirmPassword: z.string(),
  name: z.string().nonempty({ message: "이름을 입력하세요." }),
  birthDate: z
    .string()
    .nonempty({ message: "생년월일을 선택하세요." })
    .refine((value) => dayjs(value, "YYYY-MM-DD").isValid(), {
      message: "생년월일을 선택하세요.",
    }),
  phoneNumber: z.string().nonempty({ message: "연락처를 입력하세요." }),
  dealership: z.string().nonempty({ message: "대리점을 선택하세요." }),
  startDate2: z.array(z.string()).nonempty({ message: "입사일을 선택하세요." }),
  startDate: z
    .string()
    .nonempty({ message: "입사일을 선택하세요." })
    .refine((value) => dayjs(value, "YYYY-MM-DD").isValid(), {
      message: "입사일을 선택하세요.",
    }),
  startDate3: z.object({
    startDate: z
      .string()
      .nonempty({ message: "입사일을 선택하세요." })
      .refine((value) => dayjs(value, "YYYY-MM-DD").isValid(), {
        message: "입사일을 선택하세요.",
      }),
    endDate: z
      .string()
      .nonempty({ message: "종료일을 선택하세요." })
      .refine((value) => dayjs(value, "YYYY-MM-DD").isValid(), {
        message: "종료일을 선택하세요.",
      }),
  }),
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
      startDate2: [dayjs().format("YYYY-MM-DD")],
      startDate3: {
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
      },
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
        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>이메일</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-2 w-full"
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
        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>비밀번호</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Write some stuff..."
                value={value}
                className="border border-gray-300 rounded-lg p-2 w-full"
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
        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>비밀번호 확인</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Write some stuff..."
                value={value}
                className="border border-gray-300 rounded-lg p-2 w-full"
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
        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>이름</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-2 w-full"
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
        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>비밀번호 확인</Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg p-2 w-full"
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

        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>등록일</Text>
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
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>등록일2</Text>
          <Controller
            control={control}
            name="startDate2"
            render={({ field: { onChange, value } }) => (
              <MultiDatePickerInput onChange={onChange} values={value} />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        <View className="mb-4 w-full max-w-sm flex-col gap-2">
          <Text>등록일3</Text>
          <Controller
            control={control}
            name="startDate3"
            render={({ field: { onChange, value } }) => (
              <DateRangePickerInput
                onChange={onChange}
                startDate={value.startDate}
                endDate={value.endDate}
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
