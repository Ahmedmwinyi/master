import { Platform, ScrollView, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatsTab = () => {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingTop: Platform.OS === "android" ? insets.top : 0,
        paddingBottom: insets.bottom,
      }}
    >
      <Text className="text-white">ChatsTab</Text>
    </ScrollView>
  );
};

export default ChatsTab;
