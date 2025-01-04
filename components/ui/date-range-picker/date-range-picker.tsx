import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import React from "react";
import { Pressable, SafeAreaView, Text, View, Modal } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui";

/**
 * A date picker input component that allows users to select a date using a modal.
 * It displays the selected date and provides an option to customize the date format.
 *
 * @component
 * @param {string | number} props.value - The current value of the date input, either as a string or a timestamp.
 * @param {function(string): void} props.onChange - Callback function triggered when a date is selected. The selected date is passed as a formatted string.
 * @param {string} [props.valueDateFormat] - Optional. The format string used to format the date value. Defaults to "YYYY-MM-DD".
 * @param {string} [props.title] - Optional. The title of the date picker modal.
 * @param {Date} [props.minDate] - Optional. The minimum date that can be selected.
 * @param {Date} [props.maxDate] - Optional. The maximum date that can be selected.
 * @returns {JSX.Element} A date picker input component.
 *
 * @example

 */

const DateRangePickerInput = ({
  startDate: initialStartDate,
  endDate: initialEndDate,
  onChange,
  valueDateFormat: dateFormat,
  title,
  minDate,
  maxDate,
}: {
  startDate: string | number;
  endDate: string | number;
  onChange: ({
    startDate,
    endDate,
  }: {
    startDate: string | number;
    endDate: string | number;
  }) => void;
  valueDateFormat?: string;
  title?: string;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { colorScheme } = useColorScheme();
  const [range, setRange] = React.useState<{
    startDate: DateType;
    endDate: DateType;
  }>({
    startDate: dayjs(initialStartDate).toDate(),
    endDate: dayjs(initialEndDate).toDate(),
  });

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        className="flex-row gap-2 border border-gray-300 rounded-lg p-2 w-full"
      >
        <Ionicons
          name={"calendar"}
          size={20}
          color={Colors[colorScheme ?? "light"].tint}
        />
        <View>
          <Text>
            {initialStartDate} ~ {initialEndDate}
          </Text>
        </View>
      </Pressable>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background for better focus
          }}
        >
          <Card className="bg-white flex-col p-8 rounded-lg">
            <Pressable
              className={cn(
                "flex-row",
                title ? "justify-between" : "justify-end"
              )}
              onPress={() => {
                setModalVisible(false);
                setRange({
                  startDate: dayjs(initialStartDate).toDate(),
                  endDate: dayjs(initialEndDate).toDate(),
                });
              }}
            >
              {title && <Text className="text-gray-700 text-sm">{title}</Text>}
              <Ionicons size={24} name="close" color={"#000000"} />
            </Pressable>

            <DateTimePicker
              headerButtonColor={Colors[colorScheme ?? "light"].tint}
              selectedItemColor={Colors[colorScheme ?? "light"].tint}
              selectedTextStyle={{
                fontWeight: "bold",
                color: "#fff",
              }}
              todayContainerStyle={{
                borderWidth: 1,
              }}
              mode="range"
              minDate={minDate}
              maxDate={maxDate}
              startDate={range.startDate}
              endDate={range.endDate}
              onChange={(params) => {
                setRange(params);
              }}
            />
            <Button
              onPress={() => {
                setModalVisible(false);
                onChange({
                  startDate: dayjs(range.startDate).format(
                    dateFormat ?? "YYYY-MM-DD"
                  ),
                  endDate: dayjs(range.endDate).format(
                    dateFormat ?? "YYYY-MM-DD"
                  ),
                });
              }}
              variant="solid"
              className="bg-blue-600  rounded-md"
            >
              <Text className="text-white text-lg">저장</Text>
            </Button>
          </Card>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default DateRangePickerInput;
