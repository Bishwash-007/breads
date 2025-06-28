import { View } from "react-native";
import { useThemeStore } from "./useThemeStore";

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeStore();

  return <View className={theme}> {children}</View>;
};
