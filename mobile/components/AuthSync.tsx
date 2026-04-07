import { useAuthCallback } from "@/hooks/useAuth";
import { useAuth, useUser } from "@clerk/expo";
import { useEffect, useRef } from "react";

const AuthSync = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { mutate: syncUser } = useAuthCallback();
  const hasSynced = useRef(false); // this is used to not run useEffect more than once

  useEffect(() => {
    if (isSignedIn && user && !hasSynced.current) {
      

      syncUser(undefined, {
        onSuccess: (data) => {
          hasSynced.current = true;
          console.log("User synced with backend:", data.name);
        },
        onError: (error) => {
          hasSynced.current = false;
          console.error("Error syncing user:", error);
        },
      });
    }
    if (!isSignedIn) {
      hasSynced.current = false; // reset sync state when user signs out
    }
  }, [isSignedIn, user, syncUser]);

  return null;
};

export default AuthSync;
