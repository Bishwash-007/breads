import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";

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
            <TouchableOpacity style={{ marginRight: 24 }} activeOpacity={0.7}>
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
        }}
      />

      <Stack.Screen
        name="(modal)/image/[url]"
        options={{
          animation:'fade_from_bottom',
          presentation: "fullScreenModal",
          headerShown: false,
          title: "",
          headerLeft: () => (
            <TouchableOpacity>
              <Ionicons name="close" size={24} color={"white"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default AuthLayout;
