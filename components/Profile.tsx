import { View, Text, FlatList } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { ListHeaderComponent } from "./ProfileHeader";
import EmptyState from "./EmptyState";
import { ProfileProps, ThreadItemProps } from "@/types/types";

import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import ThreadItem from "./Threads";
import { useRouter } from "expo-router";

const Profile: React.FC<ProfileProps> = ({ userId, showBackButton }) => {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(public)");
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  };
  const { results, status, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {
      userId: userId,
    },
    {
      initialNumItems: 5,
    }
  );

  return (
    <View className="flex-1 pt-12 bg-white dark:bg-black">
      <FlatList
        data={results}
        renderItem={({ item }) => <ThreadItem {...(item as ThreadItemProps)} />}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<EmptyState />}
        ListHeaderComponent={
          <ListHeaderComponent
            handleSignOut={handleSignOut}
            showBackButton={true}
          />
        }
      />
    </View>
  );
};

export default Profile;
