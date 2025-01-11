import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const AppointmentsLayout = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.appointments"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default AppointmentsLayout;
