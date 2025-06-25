import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ProfileProps } from "./Profile";
import { formatNumber } from "@/utils/format";

export const UserProfileView: React.FC<ProfileProps> = () => {
  const { userProfile } = useUserProfile();
  // const profile = useQuery(api.users.getUserById, {
  //   userId: userId as Id<"users">,
  // });
  // const isSelf = userId === userProfile?._id;

  const isSelf = true;

  return (
    <View className="px-6 py-6">
      <View className=" flex flex-row justify-between items-center">
        <View className="flex flex-col">
          <Text className="text-lg font-semibold">
            {userProfile?.first_name}
            {userProfile?.last_name}
          </Text>
          <Text className="text-sm text-gray-500">
            @{userProfile?.username}
          </Text>
        </View>

        {/* user Image  */}
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

      {/* user bio */}

      <View className="text-lg flex flex-col pt-4">
        <Text>{userProfile?.bio}</Text>

        <View className="flex flex-row pt-2">
          <Text>{formatNumber(userProfile?.followersCount)}</Text>
        </View>
      </View>

      <View className="flex flex-row items-center gap-2 justify-start pt-2">
        <Ionicons name="globe-outline" size={12} />
        <Text>{userProfile?.websiteUrl}</Text>
      </View>

      {/* conditonal button */}
      <>
        <View className="w-full flex-row justify-between items-center gap-2 mt-6">
          {isSelf ? (
            <>
              {/* Edit Profile Button */}

              <Link
                href={`/(auth)/(modal)/edit-profile?biostring=${encodeURIComponent(userProfile?.bio || "")}&linkstring=${encodeURIComponent(userProfile?.websiteUrl || "")}&userId=${userProfile?._id}&imageUrl=${encodeURIComponent(userProfile?.imageUrl || "")}`}
                asChild
              >
                <TouchableOpacity
                  className="flex-1 bg-black py-2 px-4 rounded-lg flex-row items-center justify-center space-x-4 gap-x-2"
                  onPress={() => console.log("Edit Profile")}
                >
                  <Ionicons name="create-outline" size={20} color="white" />
                  <Text className="text-base font-semibold text-white">
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              </Link>

              {/* Share Profile Button */}
              <TouchableOpacity
                className="flex-1 bg-white py-2 px-4 rounded-lg flex-row items-center justify-center space-x-2 gap-x-2 border border-gray-300"
                onPress={() => console.log("Share Profile")}
              >
                <Ionicons name="share-social-outline" size={20} color="black" />
                <Text className="text-base font-semibold text-black">
                  Share Profile
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {/* Follow Button */}
              <TouchableOpacity
                className="flex-1 bg-black py-2 px-4 rounded-lg flex-row items-center justify-center  gap-x-2 space-x-2"
                onPress={() => console.log("Follow")}
              >
                <Ionicons name="person-add-outline" size={20} color="white" />
                <Text className="text-base font-semibold text-white">
                  Follow
                </Text>
              </TouchableOpacity>

              {/* Mention Button */}
              <TouchableOpacity
                className="flex-1 bg-white py-2 px-4 rounded-lg flex-row items-center justify-center space-x-2 gap-x-2 border border-gray-300"
                onPress={() => console.log("Mention")}
              >
                <Ionicons name="at-outline" size={20} color="black" />
                <Text className="text-base font-semibold text-black">
                  Mention
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </>

      {/* end */}
    </View>
  );
};
