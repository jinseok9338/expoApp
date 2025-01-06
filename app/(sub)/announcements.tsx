import { View, Text, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
}

// Mock data - replace with actual API call
export const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Important Update to Hospital Policy",
    summary: "New guidelines regarding visitor policies and safety protocols",
    content:
      "<h1>Hospital Policy Update</h1><p>Starting from next month...</p>",
    createdAt: "2024-03-20T10:00:00Z",
  },
  {
    id: "2",
    title: "Holiday Schedule Changes",
    summary: "Modified working hours during the upcoming holiday season",
    content: "<h1>Holiday Hours</h1><p>During the holiday season...</p>",
    createdAt: "2024-03-19T15:30:00Z",
  },
];

export default function AnnouncementsScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const renderAnnouncement = ({ item }: { item: Announcement }) => (
    <Pressable
      onPress={() => router.push(`/(sub)/announcement/${item.id}`)}
      className="p-4 border border-gray-200 rounded-lg mx-4 mb-3 bg-white"
    >
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-semibold text-gray-900">
          {item.title}
        </Text>
        <Text className="text-xs text-gray-500">
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>
      <Text className="text-sm text-gray-600">{item.summary}</Text>
    </Pressable>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={mockAnnouncements}
        renderItem={renderAnnouncement}
        keyExtractor={(item) => item.id}
        contentContainerClassName="py-3"
        ListEmptyComponent={
          <View className="p-4 items-center">
            <Text className="text-gray-500">{t("announcements.empty")}</Text>
          </View>
        }
      />
    </View>
  );
}
