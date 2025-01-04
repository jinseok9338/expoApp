import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import React from "react";
import { Pressable, SafeAreaView, Text, Modal } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Card } from "@/components/ui";
import { cn } from "@/lib/utils";

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
 * // Usage example:
 * import DatePickerInput from './DatePickerInput';
 *
 * const ExampleComponent = () => {
 *   const [date, setDate] = React.useState('2023-01-01');
 *
 *   return (
 *     <DatePickerInput
 *       value={date}
 *       onChange={(newDate) => setDate(newDate)}
 *       valueDateFormat="DD/MM/YYYY"
 *     />
 *   );
 * };
 *
 * export default ExampleComponent;
 */

const SingleDatePickerInput = ({
  value,
  onChange,
  valueDateFormat: dateFormat,
  title,
  minDate,
  maxDate,
}: {
  value: string | number;
  onChange: (value: string) => void;
  valueDateFormat?: string;
  title?: string;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const { colorScheme } = useColorScheme();
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
        <Text>{value}</Text>
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
              onPress={() => setModalVisible(false)}
            >
              {title && <Text className="text-gray-700 text-sm">{title}</Text>}
              <Ionicons size={24} name="close" color={"#000000"} />
            </Pressable>

            <DateTimePicker
              displayFullDays
              headerButtonColor={Colors[colorScheme ?? "light"].tint}
              selectedItemColor={Colors[colorScheme ?? "light"].tint}
              selectedTextStyle={{
                fontWeight: "bold",
                color: "#fff",
              }}
              todayContainerStyle={{
                borderWidth: 1,
              }}
              mode="single"
              minDate={minDate}
              maxDate={maxDate}
              date={value}
              onChange={(v) => {
                onChange(dayjs(v.date).format(dateFormat ?? "YYYY-MM-DD"));
                setModalVisible(false);
              }}
            />
          </Card>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default SingleDatePickerInput;
