import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback } from "react";

export default function App() {
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

  const handleFacebookLogin = useCallback(
    () => handleLogin("facebook"),
    [handleLogin]
  );
  const handleGoogleLogin = useCallback(
    () => handleLogin("google"),
    [handleLogin]
  );
  return (
    <View className="flex-1 bg-white">
      {/* image  */}
      <Image
        source={require("@/assets/images/login.png")}
        resizeMode="contain"
        className="w-full h-[350px]"
      />

      <ScrollView className="flex-1 py-6">
        <Text className="text-xl font-semibold py-6 text-center">
          How would you like to use Breads?
        </Text>

        {/* Buttons */}
        <View className="gap-6 pt-6 px-8">
          {/* instagram  */}
          <TouchableOpacity
            className="p-4 rounded-2xl border-hairline border-slate-400 bg-white"
            onPress={handleFacebookLogin}
          >
            <View className="flex-row items-center justify-between py-2">
              <Image
                source={require("@/assets/images/instagram_icon.webp")}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Text className="flex-1 ml-4 text-lg font-medium">
                Continue with Instagram
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#1f2937" />
            </View>
            <Text className="mt-2 text-sm text-gray-700">
              Login to create a Breads account with WayneStagram. See updates
              about Gotham, heroes, and villains.
            </Text>
          </TouchableOpacity>

          {/* google  */}
          <TouchableOpacity
            className="p-4 rounded-2xl border-hairline border-slate-400 bg-white"
            onPress={handleGoogleLogin}
          >
            <View className="flex-row items-center justify-evenly">
              <Image
                source={require("@/assets/images/google.webp")}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="flex-1 ml-4 text-lg font-medium">
                Continue with Google
              </Text>
              <Ionicons name="chevron-forward" size={24} color="#1f2937" />
            </View>
          </TouchableOpacity>

          {/* Switch account */}
          <TouchableOpacity className="mt-6">
            <Text className="text-center text-gray-800 font-semibold">
              Switch Accounts
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
