import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Link, router } from "expo-router";

const Page = () => {
  const isPresented = router.canGoBack();
  return (
    <View>
      <Text>Modal screen</Text>
      {isPresented && (
        <TouchableOpacity onPress={() => router.back()}>
          <Text>Dismiss</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Page;
