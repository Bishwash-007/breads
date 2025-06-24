import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack} from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const AuthLayout = () => {

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: "white",
        },
        headerShadowVisible: false,
        animation: "slide_from_bottom",
      }}
    >
      {/* Tabs layout (Main app) */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Create Thread Modal */}
      <Stack.Screen
        name="(modal)/create"
        options={{
          presentation: "transparentModal",
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 24 }}
              activeOpacity={0.7}
            >
              <Ionicons
                name="ellipsis-horizontal-circle"
                size={24}
                color="#000"
              />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Edit Profile Modal */}
      <Stack.Screen
        name="(modal)/edit-profile"
        options={{
          presentation: "modal",
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 24 }}
              activeOpacity={0.7}
            >
              <Text>Cancel</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
