import { useCallback } from "react";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";

export function useAuthSSO() {
  const { startSSOFlow } = useSSO();

  const handleLogin = useCallback(
    async (provider: "facebook" | "google") => {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: `oauth_${provider}`,
          redirectUrl: AuthSession.makeRedirectUri({}),
        });

        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
        } else {
          console.warn(`No session returned from ${provider}`);
        }
      } catch (err) {
        console.error("Clerk SSO error:", JSON.stringify(err, null, 2));
      }
    },
    [startSSOFlow]
  );

  return { handleLogin };
}
