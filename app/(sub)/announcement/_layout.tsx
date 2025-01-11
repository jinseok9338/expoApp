import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const AnnouncementLayout = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.announcement"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default AnnouncementLayout;
