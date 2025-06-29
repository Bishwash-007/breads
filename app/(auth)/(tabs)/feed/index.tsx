import {
  View,
  Text,
  RefreshControl,
  Image,
  useColorScheme,
} from "react-native";
import React, { useState } from "react";
import { api } from "@/convex/_generated/api";
import { usePaginatedQuery } from "convex/react";
import ThreadItem from "@/components/Threads";
import ThreadComposer from "@/components/ThreadComposer";
import { ThreadItemProps } from "@/types/types";
import { useNavigation } from "expo-router";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useIsFocused } from "@react-navigation/native";

const Feed = () => {
  const { results, loadMore } = usePaginatedQuery(
    api.messages.getThreads,
    {},
    {
      initialNumItems: 5,
    }
  );
  

  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const scrollOffset = useSharedValue(0);
  const tabBarHeight = useBottomTabBarHeight();
  const isFocused = useIsFocused();
  const theme = useColorScheme();

  const updateTabBar = () => {
    let newMarginBottom = 0;
    if (scrollOffset.value >= 0 && scrollOffset.value <= tabBarHeight) {
      newMarginBottom = -scrollOffset.value;
    } else if (scrollOffset.value > tabBarHeight) {
      newMarginBottom = -tabBarHeight;
    }
    navigation.getParent()?.setOptions({
      tabBarHeight: newMarginBottom,
    });
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      if (isFocused) {
        scrollOffset.value = e.contentOffset.y;
        runOnJS(updateTabBar)();
      }
    },
  });

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const onLoadMore = () => {
    loadMore(5);
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "#000" : "#fff";
  const textColor = isDark ? "#fff" : "#000";
  const mutedText = isDark ? "#a3a3a3" : "#737373";

  return (
    <Animated.FlatList
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      data={results}
      keyExtractor={(item) => item._id}
      style={{ backgroundColor: bgColor }}
      renderItem={({ item }) => <ThreadItem {...(item as ThreadItemProps)} />}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={mutedText}
        />
      }
      ItemSeparatorComponent={() => <View className="w-[1px]" />}
      ListEmptyComponent={
        <Text className="text-center mt-10 text-muted-light dark:text-muted-dark">
          Nothing here
        </Text>
      }
      ListHeaderComponent={() => (
        <>
          <View className="pt-8 justify-center items-center flex-1">
            <Image
              source={
                isDark
                  ? require("@/assets/images/threads-logo-black.png") // Swap this image if you have a dark version
                  : require("@/assets/images/threads-logo-black.png")
              }
              className="size-10"
            />
          </View>
          <ThreadComposer isPreview={true} isReply={false} />
        </>
      )}
    />
  );
};

export default Feed;
