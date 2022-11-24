import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View, Text } from "react-native";

import { getPostsData } from "../../../apiCalls/getPostsData";
import { TopUserBar } from "../../../components/PlatformMain";
import { PostsFlatListOverview } from "../../../components/Posts";
import useKeyboardVisible from "../../../hooks/useIsKeyboardVisible";
import { DbPost } from "../../../types/DbPost";
import { styles } from "./styles";

export const PlatformMainScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();
  const { isKeyboardVisible } = useKeyboardVisible();

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: getPostsData,
  });

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { marginBottom: !isKeyboardVisible ? tabBarHeight : 0 },
      ]}
    >
      <TopUserBar />
      <View style={styles.post}>
        <PostsFlatListOverview posts={posts as DbPost[]} />
      </View>
    </View>
  );
};
