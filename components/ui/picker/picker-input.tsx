import React, { useState } from "react";
import { Platform, Pressable, Text, View, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";

interface PickerOption {
  label: string;
  value: string;
}

interface PickerInputProps {
  value: string;
  onChange: (value: string) => void;
  options: PickerOption[];
  placeholder: string;
}

export function PickerInput({
  value,
  onChange,
  options,
  placeholder,
}: PickerInputProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  if (Platform.OS === "android") {
    return (
      <View className="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{ backgroundColor: "transparent" }}
        >
          <Picker.Item label={placeholder} value="" />
          {options.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    );
  }

  return (
    <>
      <Pressable
        onPress={() => setIsPickerVisible(true)}
        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3"
      >
        <Text className="text-gray-900">
          {value
            ? options.find((opt) => opt.value === value)?.label
            : placeholder}
        </Text>
      </Pressable>

      <Modal visible={isPickerVisible} transparent={true} animationType="fade">
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white w-full">
            <View className="flex-row justify-end p-2 border-b border-gray-200">
              <Pressable onPress={() => setIsPickerVisible(false)}>
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
              <Picker.Item label={placeholder} value="" />
              {options.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </>
  );
}
