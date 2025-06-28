import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ViewToken,
} from "react-native";
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ThreadItemProps } from "@/types/types";
import { formatNumber, formatTimestamp } from "@/utils/format";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Link } from "expo-router";

const ThreadItem: React.FC<ThreadItemProps> = ({
  _id,
  content,
  creator,
  mediaFiles,
  likeCount,
  retweetCount,
  commentCount,
  _creationTime,
}) => {
  //states
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  // vars
  const toggleLike = useMutation(api.messages.toggleLike);
  const hasLiked = useQuery(api.messages.hasLiked, { messageId: _id });

  const [likePending, setLikePending] = useState(false);

  const handleToggleLike = async () => {
    if (likePending) return;
    setLikePending(true);
    try {
      await toggleLike({ messageId: _id });
    } catch (err) {
      console.error("Failed to toggle like:", err);
    } finally {
      setLikePending(false);
    }
  };

  return (
    <View className="py-4 px-4 border-b border-muted-300 dark:border-muted-800">
      <View className="flex-row items-start space-x-3">
        {/* Avatar */}
        <Image
          source={{ uri: creator.imageUrl }}
          className="w-10 h-10 rounded-full mt-1"
        />

        <View className="flex-1">
          {/* Header */}
          <View className="flex-col items-start px-2">
            <Text className="font-semibold text-base text-black dark:text-white">
              {creator.first_name} {creator.last_name}
            </Text>
            <Text className="text-muted-light dark:text-muted-dark text-xs">
              @{creator.username}
            </Text>
            <Text className="text-muted-light dark:text-muted-dark text-xs">
              {formatTimestamp(_creationTime)}
            </Text>
          </View>

          {/* Content */}
          <Text className="text-base pt-2 text-black dark:text-white">
            {content}
          </Text>

          {/* Media */}
          {/* Media */}
          {mediaFiles?.length > 0 && (
            <View className="py-2 -mx-4">
              <FlatList
                data={mediaFiles}
                keyExtractor={(item, index) => `${item}-${index}`}
                renderItem={({ item }) => (
                  <Link
                    href={`/(auth)/(modal)/image/${encodeURIComponent(item)}`}
                    asChild
                  >
                    <TouchableOpacity>
                      <Image
                        source={{ uri: item }}
                        className="w-[360px] h-[360px] rounded-lg mr-2"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  </Link>
                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                scrollEventThrottle={16}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
              />

              {/* Pagination dots */}
              {mediaFiles.length > 1 && (
                <View className="flex-row justify-center mt-2 space-x-2">
                  {mediaFiles.map((_, index) => (
                    <View
                      key={index}
                      className={`w-2 h-2 mx-1 rounded-full ${
                        index === activeIndex
                          ? "bg-black dark:bg-white"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    />
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Actions */}
          <View className="flex-row justify-between mt-2 pr-8">
            <TouchableOpacity
              className="flex-row items-center gap-2"
              onPress={handleToggleLike}
              disabled={likePending}
            >
              <Ionicons
                name={hasLiked ? "heart" : "heart-outline"}
                size={20}
                color={hasLiked ? "red" : "currentColor"}
              />
              <Text className="text-sm text-black dark:text-white">
                {formatNumber(likeCount)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-2">
              <AntDesign name="message1" size={20} color={"currentColor"} />
              <Text className="text-sm text-black dark:text-white">
                {formatNumber(commentCount)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-2">
              <Ionicons name="repeat" size={20} color={"currentColor"} />
              <Text className="text-sm text-black dark:text-white">
                {formatNumber(retweetCount)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center gap-2">
              <Feather name="send" size={18} color={"currentColor"} />
              <Text className="text-sm text-black dark:text-white">
                {formatNumber(retweetCount)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Options */}
        <View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-horizontal-circle-outline"
              size={20}
              color={"#737373"} // Or use dynamic color from theme
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ThreadItem;
