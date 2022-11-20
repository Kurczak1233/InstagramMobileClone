import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect } from "react";
import { View, FlatList, Text } from "react-native";

import { TopUserBar } from "../../../components/PlatformMain";
import { PostOverview } from "../../../components/Posts/PostOverview/PostOverview";
import { supaBaseclient } from "../../../utilities/supabaseClient";
import { styles } from "./styles";

export const PlatformMainScreen = () => {
  const tabBarHeight = useBottomTabBarHeight();

  const {
    isLoading,
    error,
    data: posts,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: async () => {
      const response = await supaBaseclient
        .from("posts")
        .select("*")
        .is("archived_at", null);
      return response.data;
    },
  });

  const createPost = useCallback(async () => {
    // const response = await supaBaseclient
    //   .from("posts")
    //   .insert({
    //     description: "test description 2",
    //     image_url:
    //       "https://cdn3s.com/wp-content/uploads/2022/03/This-Expressive-Disabled-Cat-Is-Here-To-Spread-Positivity-In-Our-World-Today01.jpg",
    //   })
    //   .limit(1)
    //   .single();
    // console.log(response);
  }, []);

  useEffect(() => {
    createPost();
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <TopUserBar />
      <View style={styles.post}>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PostOverview
              description={item.description}
              imageUrl={item.image_url}
              postId={item.id}
            />
          )}
        />
      </View>
    </View>
  );
};
