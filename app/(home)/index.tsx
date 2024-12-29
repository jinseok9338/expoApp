import Example from "@/components/DialogExample";
import { HapticTab } from "@/components/HapticTab";
import { Text } from "@/components/ui/text";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function HomeScreen() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("cart.discount")}</Text>
      <HapticTab>
        <Example />
      </HapticTab>
    </View>
  );
}
