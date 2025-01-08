import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { useTimeSlots } from "../../../hooks/useTimeSlots";
import { Button } from "@/components/ui";

const RegisterScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();

  const snapPoints = useMemo(() => ["40%"], []);

  const unavailableSlots = {
    "2025-01-05": ["slot-1", "slot-2", "slot-3"],
    "2025-01-06": ["slot-4", "slot-5"],
  };

  const {
    selectedDate,
    selectedSlots,
    handleDateSelection,
    handleSlotSelection,
    generateTimeSlots,
  } = useTimeSlots({ unavailableSlots });

  const handleRegisterPress = () => {
    bottomSheetRef.current?.expand();
  };

  const renderTimeSlot = ({
    item,
  }: {
    item: {
      id: string;
      startTime: string;
      endTime: string;
      isAvailable: boolean;
    };
  }) => (
    <Pressable
      onPress={() => handleSlotSelection(item.id)}
      disabled={!item.isAvailable}
      className={`
        bg-white rounded-xl p-4 mb-3 
        border-2 
        ${
          selectedSlots.includes(item.id)
            ? "border-[#50cebb]"
            : "border-gray-200"
        }
        ${!item.isAvailable ? "opacity-50" : ""}
        flex-row justify-between items-center
      `}
    >
      <Text
        className={`text-lg font-medium ${
          !item.isAvailable ? "text-gray-400" : "text-gray-900"
        }`}
      >
        {`${item.startTime} ~ ${item.endTime}`}
        {!item.isAvailable && " (Unavailable)"}
      </Text>
      {selectedSlots.includes(item.id) && (
        <Ionicons name="checkmark-circle" size={24} color="#50cebb" />
      )}
    </Pressable>
  );

  const isRegistrationValid = selectedDate && selectedSlots.length > 0;

  return (
    <GestureHandlerRootView className="flex-1">
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1">
          <View className="px-4 pt-4">
            <Calendar
              current={selectedDate}
              onDayPress={(day: DateData) =>
                handleDateSelection(day.dateString)
              }
              markedDates={{
                [selectedDate as string]: { selected: true },
              }}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                selectedDayBackgroundColor: "#50cebb",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#50cebb",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                monthTextColor: "#2d4150",
                textMonthFontWeight: "bold",
                arrowColor: "#50cebb",
                todayBackgroundColor: "transparent",
              }}
              style={{
                borderRadius: 10,
                elevation: 4,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
              }}
            />
          </View>

          <View className="flex-1 px-4 pt-6">
            <Text className="text-lg font-semibold mb-4 text-gray-900">
              {t("checks.select-time")}
            </Text>
            <FlashList
              data={generateTimeSlots()}
              renderItem={renderTimeSlot}
              estimatedItemSize={60}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <View className="px-4 pb-4">
            <Pressable
              onPress={handleRegisterPress}
              disabled={!isRegistrationValid}
              className={`
                py-4 rounded-xl
                ${isRegistrationValid ? "bg-[#50cebb]" : "bg-gray-300"}
              `}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {t("checks.register")}
              </Text>
            </Pressable>
          </View>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
        >
          <BottomSheetView className="flex-1 p-6">
            <View className="flex-1">
              <Text className="text-xl font-bold mb-4">
                {t("checks.confirm-registration")}
              </Text>
              <Text className="text-gray-600 mb-6">
                {`Date: ${selectedDate}\nTime: ${selectedSlots.length} slots selected`}
              </Text>
            </View>
            <View className="flex-row space-x-4 mb-8 gap-2">
              <Button
                onPress={() => bottomSheetRef.current?.close()}
                className="flex-1 py-3 h-12 rounded-xl bg-gray-200"
              >
                <Text className="text-center font-semibold">
                  {t("common.cancel")}
                </Text>
              </Button>
              <Button
                onPress={() => {
                  // Handle registration logic here
                  bottomSheetRef.current?.close();
                  // add toster
                  Toast.show({
                    type: "success",
                    text1: "Regular check registered successfully",
                  });
                }}
                className="flex-1 py-3 h-12 rounded-xl bg-[#50cebb]"
              >
                <Text className="text-white text-center font-semibold">
                  {t("checks.confirm")}
                </Text>
              </Button>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default RegisterScreen;
