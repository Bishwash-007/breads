import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

const tabItems = ["Threads", "Replies", "Mentions"];

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Threads");

  const renderTab = ({ item }: { item: string }) => {
    const isActive = activeTab === item;

    return (
      <TouchableOpacity
        onPress={() => setActiveTab(item)}
        className="flex-1 items-center pb-2"
        activeOpacity={0.7}
      >
        <Text
          className={`text-base font-medium ${
            isActive ? "text-black dark:text-white" : "text-neutral-400"
          }`}
        >
          {item}
        </Text>

        {/* Active underline */}
        <View
          className={`mt-2 h-0.5 rounded-full ${
            isActive ? "w-14 bg-black dark:bg-white" : "w-0"
          }`}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full border-b-hairline py-4 border-neutral-200 dark:border-neutral-700">
      <FlatList
        data={tabItems}
        renderItem={renderTab}
        keyExtractor={(item) => item}
        horizontal
        scrollEnabled={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-around",
        }}
      />
    </View>
  );
};

export default Tabs;
