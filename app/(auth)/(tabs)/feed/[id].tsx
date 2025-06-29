import { View, Text, FlatList } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQueries, useQuery } from "convex/react";
import ThreadItem from "@/components/Threads";
import { ThreadItemProps } from "@/types/types";

const ThreadDetails = () => {
  const { id } = useLocalSearchParams();

  const thread = useQuery(api.messages.getThreadById, {
    messageId: id as Id<"messages">,
  });

  return (
    <View className="flex-1 pt-8 bg-white dark:bg-black">
      <ThreadItem
        {...(thread as ThreadItemProps)}
        disableMediaLink={true}
        disableProfileLink={false}
        disableThreadLink={false}
      />
    </View>
  );
};

export default ThreadDetails;
