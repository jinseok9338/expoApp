import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import SingleDatePickerInput from "@/components/ui/datePicker/date-picker";
import dayjs from "dayjs";
import Postcode from "@actbase/react-daum-postcode";
import { Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TimePicker } from "@/components/ui/time-picker";
import { OnCompleteParams } from "@actbase/react-daum-postcode/lib/types";
import Toast from "react-native-toast-message";

// Define the form schema
const formSchema = z.object({
  date: z.date(),
  fromTime: z.date(),
  toTime: z.date(),
  address: z.string().min(1, { message: "Address is required" }),
  detailAddress: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditAppointmentScreen() {
  const { id } = useLocalSearchParams();

  const { t } = useTranslation();
  const [showPostal, setShowPostal] = useState(false);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      fromTime: new Date(),
      toTime: new Date(),
      address: "",
      detailAddress: "",
    },
  });

  const handlePostalSelect = (data: OnCompleteParams) => {
    setValue("address", `${data.address} ${data.buildingName || ""}`);
    setShowPostal(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        {/* Date Picker */}
        <Controller
          control={control}
          name="date"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                {t("appointment.edit.date")}
              </Text>
              <SingleDatePickerInput
                value={dayjs(value).format("YYYY-MM-DD")}
                onChange={onChange}
              />
              {error && (
                <Text className="text-red-500 text-sm mt-1">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Time Range */}
        <View className="mb-4">
          <Text className="text-sm font-medium text-gray-700 mb-1">
            {t("appointment.edit.time_range")}
          </Text>
          <View className="flex-row gap-2 space-x-4">
            <Controller
              control={control}
              name="fromTime"
              render={({ field: { value, onChange } }) => (
                <View className="flex-1">
                  <Pressable
                    onPress={() => setShowFromTimePicker(true)}
                    className="border rounded-lg p-3 bg-white"
                  >
                    <Text className="text-gray-900">
                      {t("appointment.appointment.startTime")} :
                      {dayjs(value).format("HH:mm")}
                    </Text>
                  </Pressable>

                  <TimePicker
                    value={value}
                    onChange={onChange}
                    visible={showFromTimePicker}
                    onClose={() => setShowFromTimePicker(false)}
                  />
                </View>
              )}
            />

            <Controller
              control={control}
              name="toTime"
              render={({ field: { value, onChange } }) => (
                <View className="flex-1">
                  <Pressable
                    onPress={() => setShowToTimePicker(true)}
                    className="border rounded-lg p-3 bg-white"
                  >
                    <Text className="text-gray-900">
                      {t("appointment.appointment.endTime")} :
                      {dayjs(value).format("HH:mm")}
                    </Text>
                  </Pressable>
                  <TimePicker
                    value={value}
                    onChange={onChange}
                    visible={showToTimePicker}
                    onClose={() => setShowToTimePicker(false)}
                  />
                </View>
              )}
            />
          </View>
        </View>

        {/* Address Fields (Previous code) */}
        <Controller
          control={control}
          name="address"
          render={({ field: { value }, fieldState: { error } }) => (
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                {t("appointment.edit.address")}
              </Text>
              <Pressable
                onPress={() => setShowPostal(true)}
                className="flex-row items-center border rounded-lg p-3 bg-white"
              >
                <Text
                  className={`flex-1 ${
                    !value ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {value || t("appointment.edit.select_address")}
                </Text>
                <Text className="text-blue-600 ml-2">
                  {t("appointment.edit.search")}
                </Text>
              </Pressable>
              {error && (
                <Text className="text-red-500 text-sm mt-1">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <Controller
          control={control}
          name="detailAddress"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-1">
                {t("appointment.edit.detail_address")}
              </Text>
              <TextInput
                className="border rounded-lg p-3 bg-white"
                placeholder={t("appointment.edit.enter_detail_address")}
                value={value}
                onChangeText={onChange}
              />
              {error && (
                <Text className="text-red-500 text-sm mt-1">
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        {/* Submit Button */}
        <Pressable
          onPress={handleSubmit((data) => {
            Toast.show({
              type: "success",
              text1: t("appointment.edit.save_success"),
              text2: t("appointment.edit.save_success_description"),
              position: "bottom",
              visibilityTime: 3000,
            });
            router.push(`/appointments/${id}`);
          })}
          className="bg-blue-600 rounded-lg p-4 mt-4"
        >
          <Text className="text-white text-center font-semibold">
            {t("common.save")}
          </Text>
        </Pressable>

        {/* Postal Code Modal (Previous code) */}
        <Modal
          visible={showPostal}
          animationType="slide"
          onRequestClose={() => setShowPostal(false)}
          statusBarTranslucent={true}
        >
          <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 p-0">
              <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
                <Text className="text-lg font-semibold">
                  {t("appointment.edit.select_address")}
                </Text>
                <Pressable onPress={() => setShowPostal(false)} className="p-2">
                  <Text className="text-blue-600 font-semibold">
                    {t("common.close")}
                  </Text>
                </Pressable>
              </View>
              <View className="flex-1">
                <Postcode
                  style={{ width: "100%", height: "100%" }}
                  jsOptions={{ animation: false }}
                  onSelected={handlePostalSelect}
                  onError={(error) => console.error(error)}
                  i18nIsDynamicList={true}
                />
              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </ScrollView>
  );
}
