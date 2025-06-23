import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs, useRouter } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import * as Haptics from "expo-haptics";
import { SignedOut, useAuth } from "@clerk/clerk-expo";

interface TabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size?: number;
  focused?: boolean;
}

const TabBarIcon = ({
  name,
  color,
  size = 24,
  focused = false,
}: TabBarIconProps) => <Ionicons name={name} color={color} size={size} />;

export default function TabsLayout() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(public)");
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          height: Platform.OS === "ios" ? 80 : 60,
          alignItems: "center",
          backgroundColor: "#fff",
        },
      })}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
              size={24}
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
            router.push("/(auth)/(modal)");
          },
        }}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
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
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
              size={24}
            />
          ),
          headerRight: () => (
            <TouchableOpacity onPress={handleSignOut} className="mr-6">
              <Ionicons name="log-out-outline" size={24} color="#000" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
