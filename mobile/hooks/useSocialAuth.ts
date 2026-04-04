import { useSSO } from "@clerk/expo";
import { useRef, useState } from "react";
import { Alert } from "react-native";

function useAuthSocial() {
  const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
  const inFlightRef = useRef(false);
  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setLoadingStrategy(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });
      if (!createdSessionId || !setActive) {
        Alert.alert(
          "Sign in incomplete",
          "Could not create a session. Please try again.",
        );
        return;
      }
      await setActive({ session: createdSessionId });
    } catch (error) {
      if (__DEV__) {
        console.error("💥 Error in social auth:", error);
      } else {
        console.error("💥 Social auth failed");
      }
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(
        "Error",
        `Failed to sign in with ${provider}. Please try again.`,
      );
    } finally {
      inFlightRef.current = false;
      setLoadingStrategy(null);
    }
  };

  return { handleSocialAuth, loadingStrategy };
}

export default useAuthSocial;
