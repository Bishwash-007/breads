import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Tabs from "./Tabs";
import { UserProfileView } from "./UserProfile";
import { ProfileProps } from "@/types/types";

export const ListHeaderComponent: React.FC<{
  showBackButton: ProfileProps["showBackButton"];
  handleSignOut: () => void;
}> = ({ showBackButton, handleSignOut }) => {
  return (
    <>
      <View className="px-4 flex-row items-center justify-between mb-2">
        {/* Left */}
        <View>
          {showBackButton ? (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center space-x-2"
            >
              <Ionicons name="chevron-back" size={24} color="black" />
              <Text className="text-xl font-medium text-black dark:text-white">
                Back
              </Text>
            </TouchableOpacity>
          ) : (
            <MaterialCommunityIcons name="web" size={24} color="black" />
          )}
        </View>

        {/* Right */}
        <View className="flex-row items-center justify-center space-x-4 gap-4">
          <Ionicons name="logo-instagram" size={24} color="black" />
          <TouchableOpacity onPress={() => handleSignOut()}>
            <Ionicons name="log-out-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* user profile */}
      <UserProfileView showBackButton={false} />
      <Tabs />
    </>
  );
};
