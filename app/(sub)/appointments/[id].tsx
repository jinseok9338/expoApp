import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";
import { useTranslation } from "react-i18next";
import MapView, { Marker } from "react-native-maps";

interface Appointment {
  id: string;
  title: string;
  fromTime: string;
  toTime: string;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

// This would typically come from an API or database
const mockAppointment: Appointment = {
  id: "1",
  title: "Doctor Appointment",
  fromTime: "2025-01-05T09:00:00",
  toTime: "2025-01-05T10:00:00",
  description: "Annual health checkup with Dr. Smith",
  location: {
    name: "Seoul Medical Center",
    latitude: 37.5665,
    longitude: 126.978,
  },
};

export default function AppointmentDetailScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  // In a real app, you would fetch the appointment data based on the ID
  const appointment = mockAppointment;

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            {appointment.title}
          </Text>
          <Link href={`/appointments/${id}/edit`} asChild>
            <Text className="text-blue-600 font-semibold">
              {t("common.edit")}
            </Text>
          </Link>
        </View>

        {/* Time Section */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            {t("appointment.appointment.time")}
          </Text>
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-sm text-gray-500">
                {t("appointment.appointment.from")}
              </Text>
              <Text className="text-base text-gray-900">
                {new Date(appointment.fromTime).toLocaleTimeString()}
              </Text>
            </View>
            <View>
              <Text className="text-sm text-gray-500">
                {t("appointment.appointment.to")}
              </Text>
              <Text className="text-base text-gray-900">
                {new Date(appointment.toTime).toLocaleTimeString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Location Section */}
        <View className="bg-white rounded-xl p-4 mb-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            {t("appointment.appointment.location")}
          </Text>
          <Text className="text-base text-gray-900 mb-3">
            {appointment.location.name}
          </Text>
          <View className="h-48 rounded-lg overflow-hidden">
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={{
                latitude: appointment.location.latitude,
                longitude: appointment.location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              <Marker
                coordinate={{
                  latitude: appointment.location.latitude,
                  longitude: appointment.location.longitude,
                }}
                title={appointment.location.name}
              />
            </MapView>
          </View>
        </View>

        {/* Description Section */}
        <View className="bg-white rounded-xl p-4">
          <Text className="text-base font-semibold text-gray-900 mb-2">
            {t("appointment.appointment.description")}
          </Text>
          <Text className="text-base text-gray-600">
            {appointment.description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
