import { Platform, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  visible?: boolean;
  onClose?: () => void;
}

export function TimePicker({
  value,
  onChange,
  visible,
  onClose,
}: TimePickerProps) {
  const { t } = useTranslation();

  if (Platform.OS === "android") {
    return visible ? (
      <DateTimePicker
        value={value}
        mode="time"
        display="default"
        onChange={(event, selectedDate) => {
          if (selectedDate && onClose) {
            onChange(selectedDate);
            onClose();
          }
        }}
      />
    ) : null;
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <View className="flex-1 justify-end bg-black/50">
        <SafeAreaView className="bg-white w-full">
          <View className="flex-row justify-end p-4 border-b border-gray-200">
            <Pressable onPress={onClose}>
              <Text className="text-blue-600 font-semibold">
                {t("common.done")}
              </Text>
            </Pressable>
          </View>
          <DateTimePicker
            value={value}
            mode="time"
            display="spinner"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                onChange(selectedDate);
              }
            }}
          />
        </SafeAreaView>
      </View>
    </Modal>
  );
}
