import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const ScanLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.scan"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ScanLayout;
