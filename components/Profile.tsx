// Profile.tsx
import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { usePaginatedQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { ProfileProps, ThreadItemProps } from "@/types/types";

import ThreadItem from "./Threads";
import EmptyState from "./EmptyState";
import { ListHeaderComponent } from "./ProfileHeader";

const Profile: React.FC<ProfileProps> = ({ userId, showBackButton }) => {
  const [activeTab, setActiveTab] = useState("Threads");

  const { signOut } = useAuth();
  const router = useRouter();

  const { results } = usePaginatedQuery(
    api.messages.getThreads,
    { userId },
    { initialNumItems: 5 }
  );

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(public)");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // TEMP: only Threads tab is wired
  const filteredResults =
    activeTab === "Threads"
      ? results
      : []; // You can wire other tab data later

  return (
    <View className="flex-1 pt-12 bg-white dark:bg-black">
      <FlatList
        data={filteredResults}
        renderItem={({ item }) => (
          <ThreadItem {...(item as ThreadItemProps)} />
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyState />}
        ListHeaderComponent={
          <ListHeaderComponent
            handleSignOut={handleSignOut}
            showBackButton={showBackButton}
            userId={userId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        }
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default Profile;