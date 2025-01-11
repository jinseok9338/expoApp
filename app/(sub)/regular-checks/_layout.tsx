import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const RegularChecksLayout = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.regular-checks"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default RegularChecksLayout;
