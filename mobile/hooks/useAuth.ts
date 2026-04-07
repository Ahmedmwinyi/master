import { useApi } from "@/lib/axios";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";

type AuthCallbackResponse = { user: User };

export const useAuthCallback = () => {
  const api = useApi();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<AuthCallbackResponse>("/auth/callback");
      return data.user;
    },
  });
};