import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { useThemeStore } from "@/context/useThemeStore";

const AppShell = () => {
  const { theme } = useThemeStore();

  return (
    <View className={`${theme} flex-1 bg-white dark:bg-black`}>
      <Slot />
    </View>
  );
};

export default AppShell;
