import { View, Text, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

interface Notification {
  id: string;
  title: string;
  description: string;
  path: string;
  createdAt: string;
  read: boolean;
}

// This would typically come from an API or database
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "New Appointment Scheduled",
    description: "Your appointment with Dr. Smith has been confirmed",
    path: "/(main)/appointments/1",
    createdAt: "2024-03-20T10:00:00Z",
    read: false,
  },
  {
    id: "2",
    title: "Appointment Reminder",
    description: "Your appointment is tomorrow at 2:00 PM",
    path: "/(main)/appointments/2",
    createdAt: "2024-03-19T15:30:00Z",
    read: true,
  },

  // Add more mock notifications as needed
  {
    id: "3",
    title: "New Appointment Scheduled",
    description: "Your appointment with Dr. Smith has been confirmed",
    path: "/(main)/appointments/1",
    createdAt: "2024-03-20T10:00:00Z",
    read: false,
  },
  {
    id: "4",
    title: "New Appointment Scheduled",
    description: "Your appointment with Dr. Smith has been confirmed",
    path: "/(main)/appointments/1",
    createdAt: "2024-03-20T10:00:00Z",
    read: false,
  },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      // onPress={() => router.push(item.path)}
      className={`p-4 border border-gray-200 rounded-lg mx-4 mb-3 ${
        !item.read ? "bg-blue-50" : "bg-white"
      }`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text
          className={`text-base ${
            !item.read ? "font-semibold text-gray-900" : "text-gray-700"
          }`}
        >
          {item.title}
        </Text>
        <Text className="text-xs text-gray-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-sm text-gray-600">{item.description}</Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={mockNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerClassName="py-3"
        ListEmptyComponent={
          <View className="p-4 items-center">
            <Text className="text-gray-500">{t("notifications.empty")}</Text>
          </View>
        }
      />
    </View>
  );
}
