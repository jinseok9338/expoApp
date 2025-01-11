import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

const ProductManagementLayout = () => {
  const { t } = useTranslation();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: t("routing.product-management"),
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default ProductManagementLayout;
