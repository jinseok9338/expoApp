import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const NotificationsLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.notifications"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default NotificationsLayout;
