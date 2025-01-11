import { View, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import WebView from "react-native-webview";
import { mockAnnouncements } from ".";

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams();

  // Mock function to get announcement - replace with actual API call
  const getAnnouncement = (id: string) => {
    return mockAnnouncements.find((a) => a.id === id)?.content || "";
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, system-ui;
            padding: 16px;
            margin: 0;
            color: #1f2937;
          }
          h1 { font-size: 1.5rem; }
          p { font-size: 1rem; line-height: 1.5; }
        </style>
      </head>
      <body>
        ${getAnnouncement(id as string)}
      </body>
    </html>
  `;

  return (
    <View className="flex-1 bg-white">
      <WebView
        source={{ html: htmlContent }}
        startInLoadingState={true}
        renderLoading={() => (
          <View className="absolute inset-0 justify-center items-center">
            <ActivityIndicator size="large" />
          </View>
        )}
      />
    </View>
  );
}
