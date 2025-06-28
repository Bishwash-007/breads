import React from "react";
import { View, FlatList, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const ImageView = () => {
  const { url } = useLocalSearchParams();
  const urls = Array.isArray(url)
    ? url.map(decodeURIComponent)
    : [decodeURIComponent(url)];

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "black" }}>
      <FlatList
        data={urls}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item }) => (
          <View
            style={{
              width,
              height,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ImageZoom
              uri={item}
              minScale={0.5}
              maxScale={2}
              doubleTapScale={3}
              isSingleTapEnabled
              isDoubleTapEnabled
              style={{ width, height }}
            />
          </View>
        )}
      />
    </GestureHandlerRootView>
  );
};

export default ImageView;
