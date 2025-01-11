import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const InstallationRegistrationLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.installation-registration"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default InstallationRegistrationLayout;
