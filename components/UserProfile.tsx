import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserProfile } from "@/hooks/useUserProfile";
import { formatNumber } from "@/utils/format";
import { ProfileProps } from "@/types/types";

export const UserProfileView: React.FC<ProfileProps> = () => {
  const { userProfile } = useUserProfile();
  const isSelf = true;

  return (
    <View className="px-6 py-6">
      <View className="flex flex-row justify-between items-center">
        <View className="flex flex-col">
          <Text className="text-lg font-semibold text-black dark:text-white">
            {userProfile?.first_name}
            {userProfile?.last_name}
          </Text>
          <Text className="text-sm text-muted-light dark:text-muted-dark">
            @{userProfile?.username}
          </Text>
        </View>

        <View>
          <Image
            source={{
              uri: userProfile?.imageUrl ?? undefined,
            }}
            resizeMode="cover"
            className="size-14 rounded-full"
          />
        </View>
      </View>

      <View className="text-lg flex flex-col pt-4">
        <Text className="text-black dark:text-white">{userProfile?.bio}</Text>
        <View className="flex flex-row pt-2">
          <Text className="text-black dark:text-white">
            {formatNumber(userProfile?.followersCount)}
          </Text>
        </View>
      </View>

      <View className="flex flex-row items-center gap-2 justify-start pt-2">
        <Ionicons name="globe-outline" size={12} color="gray" />
        <Text className="text-black dark:text-white">
          {userProfile?.websiteUrl}
        </Text>
      </View>

      <>
        <View className="w-full flex-row justify-between items-center gap-2 mt-6">
          {isSelf ? (
            <>
              <Link
                href={`/(auth)/(modal)/edit-profile?biostring=${encodeURIComponent(userProfile?.bio || "")}&linkstring=${encodeURIComponent(userProfile?.websiteUrl || "")}&userId=${userProfile?._id}&imageUrl=${encodeURIComponent(userProfile?.imageUrl || "")}`}
                asChild
              >
                <TouchableOpacity
                  className="flex-1 bg-black dark:bg-white py-2 px-4 rounded-lg flex-row items-center justify-center gap-x-2"
                  onPress={() => console.log("Edit Profile")}
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                  <Text className="text-base font-semibold text-white dark:text-black">
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity
                className="flex-1 bg-white dark:bg-muted-800 py-2 px-4 rounded-lg flex-row items-center justify-center gap-x-2 border border-gray-300 dark:border-muted-700"
                onPress={() => console.log("Share Profile")}
              >
                <Ionicons name="share-social-outline" size={20} color="black" />
                <Text className="text-base font-semibold text-black dark:text-white">
                  Share Profile
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                className="flex-1 bg-black dark:bg-white py-2 px-4 rounded-lg flex-row items-center justify-center gap-x-2"
                onPress={() => console.log("Follow")}
              >
                <Ionicons name="person-add-outline" size={20} color="white" />
                <Text className="text-base font-semibold text-white dark:text-black">
                  Follow
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white dark:bg-muted-800 py-2 px-4 rounded-lg flex-row items-center justify-center gap-x-2 border border-gray-300 dark:border-muted-700"
                onPress={() => console.log("Mention")}
              >
                <Ionicons name="at-outline" size={20} color="black" />
                <Text className="text-base font-semibold text-black dark:text-white">
                  Mention
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </>
    </View>
  );
};
