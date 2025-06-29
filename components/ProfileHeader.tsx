import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { UserProfileView } from "./UserProfile";
import { useUser } from "@clerk/clerk-expo";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Tabs from "./Tabs";

type Props = {
  showBackButton?: boolean;
  handleSignOut: () => void;
  userId?: Id<"users">;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export const ListHeaderComponent: React.FC<Props> = ({
  showBackButton,
  handleSignOut,
  userId,
  activeTab,
  setActiveTab,
}) => {
  const { user } = useUser();
  const currentClerkId = user?.id;

  const currentUser = useQuery(api.users.getUserByClerkId, {
    clerkId: currentClerkId,
  });

  const isCurrentUser = !userId || userId === currentUser?._id;

  return (
    <>
      <View className="px-4 flex-row items-center justify-between mb-2">
        {/* Left Icon: back button OR web icon */}
        <View>
          {isCurrentUser ? (
            <MaterialCommunityIcons name="web" size={24} color="black" />
          ) : (
            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row items-center space-x-2"
            >
              <Ionicons name="chevron-back" size={24} color="black" />
              <Text className="text-xl font-medium text-black dark:text-white">
                Back
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Right Icon: show logout only if it's current user */}
        <View className="flex-row items-center justify-center space-x-4 gap-4">
          <Ionicons name="logo-instagram" size={24} color="black" />
          {isCurrentUser && (
            <TouchableOpacity onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <UserProfileView userId={userId} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  );
};
