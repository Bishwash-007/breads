import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback } from "react";
import { router } from "expo-router";

export default function App() {
  const { startSSOFlow } = useSSO();

  const handleFacebookLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_facebook",
          redirectUrl: AuthSession.makeRedirectUri(),
        });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }, []);
  const handleGoogleLogin = useCallback(async () => {
    try {
      const { createdSessionId, setActive, signIn, signUp } =
        await startSSOFlow({
          strategy: "oauth_google",
          redirectUrl: AuthSession.makeRedirectUri(),
        });
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }, []);

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
                className="w-8 h-8"
                resizeMode="contain"
              />
              <Text className="flex-1 ml-4 text-lg font-medium">
                Continue with WayneStagram
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
                className="w-8 h-8"
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
