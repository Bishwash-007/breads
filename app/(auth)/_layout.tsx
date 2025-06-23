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
      }}
    >
      {/* Main tabs layout */}
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />

      {/* Modal route */}
      <Stack.Screen
        name="(modal)/index"
        options={{
          presentation: "formSheet",
          title: "New Thread",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => console.log("Options pressed")}
              style={{ marginRight: 24 }} // Using inline style instead of className
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
    </Stack>
  );
};

export default AuthLayout;
