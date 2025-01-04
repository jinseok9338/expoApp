import { useColorScheme } from "@/hooks/useColorScheme";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import React from "react";
import { Modal, Pressable, SafeAreaView, Text } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { Colors } from "react-native/Libraries/NewAppScreen";

import { Badge, BadgeText, Button, Card, Textarea } from "@/components/ui";
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

const MultiDatePickerInput = ({
  values,
  onChange,
  valueDateFormat: dateFormat,
  title,
  minDate,
  maxDate,
}: {
  values: string[] | number[];
  onChange: (values: (string | number)[]) => void;
  valueDateFormat?: string;
  title?: string;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [tempValues, setTempValues] =
    React.useState<(string | number)[]>(values);
  const { colorScheme } = useColorScheme();
  const handlePressClose = (index: number) => {
    const newValues = values.filter((_, i) => i !== index);
    onChange(newValues);
    setTempValues(newValues);
  };

  return (
    <>
      <Pressable
        onPress={() => {
          setModalVisible(true);
        }}
        className="flex-row gap-2 border border-gray-300 rounded-lg p-2 w-full mr-4"
      >
        <Ionicons
          name={"calendar"}
          size={20}
          color={Colors[colorScheme ?? "light"].tint}
        />
        <Textarea className="border-none outline-none w-fit h-fit flex-row flex-wrap gap-1">
          {values.map((value, index) => (
            <Badge
              key={value}
              variant="solid"
              action="info"
              className="flex-row w-fit gap-2 rounded-md bg-indigo-300"
            >
              <BadgeText>{value}</BadgeText>

              <Ionicons
                size={15}
                name="close"
                onPress={() => handlePressClose(index)}
              />
            </Badge>
          ))}
        </Textarea>
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
                setTempValues(values);
              }}
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
              mode="multiple"
              minDate={minDate}
              maxDate={maxDate}
              dates={tempValues}
              onChange={({ dates }) => {
                const stringDates = dates.map((date) =>
                  dayjs(date).format(dateFormat ?? "YYYY-MM-DD")
                );
                setTempValues(stringDates);
              }}
            />

            <Button
              onPress={() => {
                onChange(tempValues);
                setModalVisible(false);
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

export default MultiDatePickerInput;
