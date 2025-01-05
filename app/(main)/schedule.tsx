import { View, Text, Pressable } from "react-native";
import { Calendar, DateData } from "react-native-calendars";
import { useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";

interface Appointment {
  id: string;
  title: string;
  description: string;
  time: string;
}

interface AppointmentMap {
  [date: string]: Appointment[];
}

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const appointments: AppointmentMap = {
    "2025-01-05": [
      {
        id: "1",
        title: "Doctor Appointment",
        description: "Annual health checkup",
        time: "09:00",
      },
      {
        id: "2",
        title: "Dentist",
        description: "Regular cleaning",
        time: "11:30",
      },
      {
        id: "3",
        title: "Meeting",
        description: "Team sync",
        time: "14:00",
      },
    ],
    "2025-01-22": [
      {
        id: "4",
        title: "Lunch Meeting",
        description: "Client discussion",
        time: "12:30",
      },
    ],
  };

  const getMarkedDates = () => {
    const marked: { [key: string]: any } = {};

    Object.keys(appointments).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: "#50cebb",
        dots: appointments[date].map(() => ({ color: "#50cebb" })),
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

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <Pressable
      onPress={() => router.push(`/(main)/appointments/${item.id}`)}
      className="bg-white rounded-xl p-4 mb-3 border border-gray-100"
    >
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-900">
            {item.title}
          </Text>
          <Text className="text-gray-600 mt-1">{item.description}</Text>
        </View>
        <Text className="text-blue-600 font-medium">{item.time}</Text>
      </View>
    </Pressable>
  );

  const selectedAppointments = appointments[selectedDate] || [];

  const { t } = useTranslation();
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 pt-4">
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
          {selectedAppointments.length
            ? t("calendar.appointments.has-appointments")
            : t("calendar.appointments.no-appointments")}
        </Text>
        <FlashList
          data={selectedAppointments}
          renderItem={renderAppointment}
          estimatedItemSize={88}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
