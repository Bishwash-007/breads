import { Link } from "expo-router";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export type ModalHeaderProps = {
  title: string;
  leftText: string;
  rightText: string;
  onPressLeft?: () => void;
  onPressRight?: () => void;
};

export const Header: React.FC<ModalHeaderProps> = ({
  title,
  leftText,
  rightText,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View className="flex flex-row justify-between items-center pt-6 px-2">
      <TouchableOpacity onPress={onPressLeft}>
        <Text className="text-lg text-gray-600">{leftText}</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-semibold">{title}</Text>
      <TouchableOpacity onPress={onPressRight}>
        <Text className="text-lg text-gray-600">{rightText}</Text>
      </TouchableOpacity>
    </View>
  );
};
