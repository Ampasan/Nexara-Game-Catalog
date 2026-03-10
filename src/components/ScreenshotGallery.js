import React, { useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import ImageViewing from "react-native-image-viewing";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ScreenshotGallery({ screenshots }) {
  if (!screenshots || screenshots.length === 0) return null;

  const [visible, setVisible] = useState(false);
  const currentIndexRef = useRef(0);
  const [initialIndex, setInitialIndex] = useState(0);

  const images = useMemo(
    () => screenshots.map((uri) => ({ uri })),
    [screenshots]
  );

  const openPreview = (index) => {
    currentIndexRef.current = index;
    setInitialIndex(index);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screenshots</Text>
      <FlatList
        horizontal
        data={screenshots}
        keyExtractor={(uri, index) => `${uri}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Pressable onPress={() => openPreview(index)}>
            <Image source={{ uri: item }} style={styles.screenshot} />
          </Pressable>
        )}
      />

      <ImageViewing
        images={images}
        imageIndex={initialIndex}
        visible={visible}
        onRequestClose={() => {
          setVisible(false);
          setInitialIndex(currentIndexRef.current);
        }}
        onImageIndexChange={(index) => {
          currentIndexRef.current = index;
        }}
      />
    </View>
  );
}

const ITEM_WIDTH = SCREEN_WIDTH * 0.74;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 12,
  },
  listContent: {
    paddingVertical: 4,
  },
  screenshot: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 0.56,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#E5E7EB",
  },
});
