import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@clerk/expo";

const ProfileTab = () => {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ScrollView
      className="bg-surface"
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingTop: Platform.OS === "android" ? insets.top : 0,
        paddingBottom: insets.bottom,
      }}
    >
      <Text className="text-white">ProfileTab</Text>
      <Pressable
        onPress={handleSignOut}
        className="bg-red-500 px-4 py-2 rounded-lg mt-4"
      >
        <Text className="text-white text-center font-semibold">Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
};

export default ProfileTab;
