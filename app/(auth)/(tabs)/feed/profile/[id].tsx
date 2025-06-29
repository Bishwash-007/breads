import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import Profile from "@/components/Profile";
import { Id } from "@/convex/_generated/dataModel";

const ProfileDetails = () => {
  const { id } = useLocalSearchParams();
  console.log(id);

  return <Profile showBackButton={false} userId={id as Id<"users">} />;
};

export default ProfileDetails;
