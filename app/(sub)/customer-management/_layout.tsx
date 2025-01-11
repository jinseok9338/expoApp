import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const CustomerManagementLayout = () => {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.customer-management"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default CustomerManagementLayout;
