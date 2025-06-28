import { ModalHeaderProps } from "@/types/types";
import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const Header: React.FC<ModalHeaderProps> = ({
  title,
  leftText,
  rightText,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View className="flex flex-row justify-between items-center pt-6 px-2 pb-4">
      <TouchableOpacity onPress={onPressLeft}>
        <Text className="text-lg text-gray-600 dark:text-gray-400">
          {leftText}
        </Text>
      </TouchableOpacity>
      <Text className="text-2xl font-semibold text-black dark:text-white">
        {title}
      </Text>
      <TouchableOpacity onPress={onPressRight}>
        <Text className="text-lg text-gray-600 dark:text-gray-400">
          {rightText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
