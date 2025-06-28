import { Ionicons } from "@expo/vector-icons";
import { Text, View, useColorScheme } from "react-native";

const EmptyState = () => {
  const theme = useColorScheme();
  const isDark = theme === "dark";

  return (
    <View className="flex flex-col items-center justify-center mt-20">
      <Ionicons
        name="chatbubble-ellipses-outline"
        size={48}
        color={isDark ? "#a3a3a3" : "#737373"}
      />
      <Text
        numberOfLines={2}
        className="text-2xl text-muted-light dark:text-muted-dark"
      >
        No Breads yet
      </Text>
    </View>
  );
};

export default EmptyState;