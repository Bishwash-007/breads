import { View, Text } from "react-native";
import React from "react";
import { useUserProfile } from "@/hooks/useUserProfile";

const Feed = () => {
  console.log(useUserProfile());

  return (
    <View className="flex h-full justify-center items-center">
      <Text>Feed</Text>
    </View>
  );
};

export default Feed;
