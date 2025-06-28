import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useCallback } from "react";
import { useAuthSSO } from "@/hooks/user/useAuthSSO";

export default function App() {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const { handleLogin } = useAuthSSO();

  const handleFacebookLogin = useCallback(
    () => handleLogin("facebook"),
    [handleLogin]
  );
  const handleGoogleLogin = useCallback(
    () => handleLogin("google"),
    [handleLogin]
  );

  return (
    <View className="flex-1 bg-white dark:bg-black">
      {/* Header image */}
      <Image
        source={require("@/assets/images/login.png")}
        resizeMode="contain"
        className="w-full h-[350px]"
      />

      <ScrollView className="flex-1 py-6">
        <Text className="text-xl font-semibold py-6 text-center text-black dark:text-white">
          How would you like to use Breads?
        </Text>

        {/* Auth Buttons */}
        <View className="gap-6 pt-6 px-8">
          {/* Instagram button */}
          <TouchableOpacity
            className="p-4 rounded-2xl border border-muted-300 dark:border-muted-700 bg-white dark:bg-muted-900"
            onPress={handleFacebookLogin}
          >
            <View className="flex-row items-center justify-between py-2">
              <Image
                source={require("@/assets/images/instagram_icon.webp")}
                className="w-10 h-10"
                resizeMode="contain"
              />
              <Text className="flex-1 ml-4 text-lg font-medium text-black dark:text-white">
                Continue with Instagram
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={isDark ? "#d4d4d4" : "#1f2937"}
              />
            </View>
            <Text className="mt-2 text-sm text-muted-light dark:text-muted-dark">
              Login to create a Breads account with WayneStagram. See updates
              about Gotham, heroes, and villains.
            </Text>
          </TouchableOpacity>

          {/* Google button */}
          <TouchableOpacity
            className="p-4 rounded-2xl border border-muted-300 dark:border-muted-700 bg-white dark:bg-muted-900"
            onPress={handleGoogleLogin}
          >
            <View className="flex-row items-center justify-evenly">
              <Image
                source={require("@/assets/images/google.webp")}
                className="w-12 h-12"
                resizeMode="contain"
              />
              <Text className="flex-1 ml-4 text-lg font-medium text-black dark:text-white">
                Continue with Google
              </Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={isDark ? "#d4d4d4" : "#1f2937"}
              />
            </View>
          </TouchableOpacity>

          {/* Switch account */}
          <TouchableOpacity className="mt-6">
            <Text className="text-center font-semibold text-muted-light dark:text-muted-dark">
              Switch Accounts
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
