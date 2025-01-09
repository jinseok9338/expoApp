import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, router } from "expo-router";
import { FlashList } from "@shopify/flash-list";

interface RegularCheck {
  id: string;
  title: string;
  description: string;
  status: "completed" | "pending" | "overdue";
  dueDate: string;
}

interface ChecksMap {
  [date: string]: RegularCheck[];
}

const RegularChecksScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const regularChecks: ChecksMap = {
    "2025-01-05": [
      {
        id: "1",
        title: "Blood Pressure Check",
        description: "Monthly blood pressure monitoring",
        status: "pending",
        dueDate: "2025-01-05",
      },
      {
        id: "2",
        title: "Weight Measurement",
        description: "Weekly weight tracking",
        status: "completed",
        dueDate: "2025-01-05",
      },
    ],
    "2025-01-22": [
      {
        id: "3",
        title: "Blood Sugar Test",
        description: "Regular glucose monitoring",
        status: "overdue",
        dueDate: "2025-01-22",
      },
    ],
  };

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};

    Object.keys(regularChecks).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: "#50cebb",
        dots: regularChecks[date].map((check) => ({
          color:
            check.status === "completed"
              ? "#2563eb"
              : check.status === "overdue"
              ? "#ff6b6b"
              : "#ffd93d",
        })),
      };
    });

    if (selectedDate) {
      marked[selectedDate] = {
        ...marked[selectedDate],
        selected: true,
        selectedColor: "#50cebb",
      };
    }

    return marked;
  };

  const renderCheck = ({ item }: { item: RegularCheck }) => (
    <Pressable
      // onPress={() => router.push(`/(sub)/regular-checks/${item.id}`)}
      className="bg-white rounded-xl p-4 mb-3 border border-gray-100"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {item.title}
          </Text>
          <Text className="text-gray-600 mt-1">{item.description}</Text>
        </View>
        <View className="items-end">
          <Text
            className={`font-medium ${
              item.status === "completed"
                ? "text-blue-600"
                : item.status === "overdue"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
          {item.status === "pending" && (
            <Link
              href={`/(sub)/regular-checks/edit/${item.id}`}
              className="mt-2"
              asChild
            >
              <TouchableOpacity activeOpacity={0.7}>
                <Text className="text-[#50cebb] font-medium">
                  {t("common.edit")}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
    </Pressable>
  );

  const selectedChecks = regularChecks[selectedDate] || [];

  const { t } = useTranslation();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 pt-4">
        <Pressable
          onPress={() => router.push("/(sub)/regular-checks/register")}
          className="bg-[#50cebb] rounded-lg py-3 mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            {t("checks.register")}
          </Text>
        </Pressable>

        <Calendar
          current={selectedDate}
          onDayPress={(day: DateData) => setSelectedDate(day.dateString)}
          markingType={"multi-dot"}
          markedDates={getMarkedDates()}
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
          {selectedChecks.length
            ? t("checks.has-checks")
            : t("checks.no-checks")}
        </Text>
        <FlashList
          data={selectedChecks}
          renderItem={renderCheck}
          estimatedItemSize={88}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default RegularChecksScreen;
