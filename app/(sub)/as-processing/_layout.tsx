import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const ASProcessingLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.as-processing"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ASProcessingLayout;
