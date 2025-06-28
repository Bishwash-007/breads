import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { Platform, TouchableOpacity, useColorScheme } from "react-native";
import * as Haptics from "expo-haptics";
import { useAuth } from "@clerk/clerk-expo";
import { TabBarIconProps } from "@/types/types";

const TabBarIcon = ({ name, color, size = 24 }: TabBarIconProps) => (
  <Ionicons name={name} color={color} size={size} />
);

export default function TabsLayout() {
  const router = useRouter();
  const { signOut } = useAuth();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const handleSignOut = () => {
    signOut();
    router.replace("/(public)");
  };

  const activeTintColor = isDark ? "#fff" : "#000";
  const inactiveTintColor = isDark ? "#aaa" : "#666";
  const tabBarBg = isDark ? "#000" : "#fff";
  const iconColor = isDark ? "#fff" : "#000";

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          alignItems: "center",
          backgroundColor: tabBarBg,
          borderTopWidth: 0.2,
          borderTopColor: isDark ? "#222" : "#ccc",
        },
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            Haptics.selectionAsync();
            router.push("/(auth)/(modal)/create");
          },
        }}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "add-circle" : "add-circle-outline"}
              color={color}
              size={28}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSignOut} className="mr-6">
              <Ionicons name="log-out-outline" size={24} color={iconColor} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
