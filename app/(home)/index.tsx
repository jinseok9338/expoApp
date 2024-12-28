import Example from "@/components/DialogExample";
import { HapticTab } from "@/components/HapticTab";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View>
      <HapticTab>
        <Example />
      </HapticTab>
    </View>
  );
}
