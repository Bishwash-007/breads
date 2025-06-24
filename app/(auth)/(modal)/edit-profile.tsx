import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router, useLocalSearchParams } from "expo-router";

const EditProfile = () => {
  const { biostring, linkstring, userId, imageUrl } = useLocalSearchParams<{
    biostring: string;
    linkstring: string;
    userId: string;
    imageUrl: string;
  }>();
  const isPresented = router.canGoBack();

  return (
    <ScrollView className="px-5 py-6 bg-white dark:bg-black">
      {isPresented && (
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
      )}
      <Text className="text-2xl text-center font-bold text-black dark:text-white mb-5">
        Edit Profile
      </Text>

      {/* Avatar Preview */}
      {imageUrl ? (
        <Image
          source={{ uri: decodeURIComponent(imageUrl) }}
          className="w-24 h-24 rounded-full mb-6"
        />
      ) : null}

      {/* Bio Section */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
          Bio:
        </Text>
        <Text className="text-base text-neutral-600 dark:text-neutral-400">
          {decodeURIComponent(biostring || "")}
        </Text>
      </View>

      {/* Link Section */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
          Link:
        </Text>
        <Text className="text-base text-blue-600">
          {decodeURIComponent(linkstring || "")}
        </Text>
      </View>

      {/* User ID Section */}
      <View className="mb-6">
        <Text className="text-base font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
          User ID:
        </Text>
        <Text className="text-base text-neutral-600 dark:text-neutral-400">
          {userId}
        </Text>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
