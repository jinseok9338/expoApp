import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const SupportCenterLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.support-center"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default SupportCenterLayout;
