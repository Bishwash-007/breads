import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const EmptyState = () => {
  return (
    <View className="flex flex-col items-center justify-center mt-20">
      <Ionicons name="chatbubble-ellipses-outline" size={48} color="#aaa" />
      <Text numberOfLines={2} className="text-2xl text-gray-500">
        No Breads yet
      </Text>
    </View>
  );
};
export default EmptyState;
