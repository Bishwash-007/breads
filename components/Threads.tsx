import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { ThreadItemProps } from "@/types/types";
import { formatNumber, formatTimestamp } from "@/utils/format";

const ThreadItem: React.FC<ThreadItemProps> = ({
  content,
  creator,
  mediaFiles,
  likeCount,
  retweetCount,
  commentCount,
  _creationTime,
}) => {
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
          {mediaFiles?.length > 0 && (
            <View
              className={`py-2 ${
                mediaFiles.length === 1 ? "" : "flex-row flex-wrap space-x-2"
              }`}
            >
              {mediaFiles.map((uri, idx) => {
                const dimension =
                  mediaFiles.length === 1
                    ? "w-full aspect-square"
                    : "w-36 h-36";
                return (
                  <Image
                    key={idx}
                    source={{ uri }}
                    className={`${dimension} rounded-lg mb-2`}
                    resizeMode="cover"
                  />
                );
              })}
            </View>
          )}

          {/* Actions */}
          <View className="flex-row justify-between mt-2 pr-8">
            <TouchableOpacity className="flex-row items-center gap-2">
              <Ionicons name="heart-outline" size={20} color={"currentColor"} />
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
