import React from "react";
import { FlatList, TouchableHighlight, View, Image } from "react-native";

import { queryClient } from "../../../../App";
import useNavigateToPostPage from "../../../hooks/useNavigateToPostPage";
import theme from "../../../theme/theme";
import { DbPost } from "../../../types/DbPost";
import { styles } from "./styles";

type IPostsThreeRowsOverview = {
  filteredPosts: DbPost[];
};

export const PostsThreeRowsOverview = ({
  filteredPosts,
}: IPostsThreeRowsOverview) => {
  const { navigateToPostPage } = useNavigateToPostPage();

  const handleImageClick = (itemId: number) => {
    navigateToPostPage(itemId);
    queryClient.invalidateQueries({
      queryKey: ["postData", itemId],
    });
  };

  return (
    <FlatList
      data={filteredPosts as DbPost[]}
      scrollEnabled
      style={[styles.container]}
      contentContainerStyle={styles.listContainer}
      numColumns={3}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <TouchableHighlight
          underlayColor={theme.colors.overlay}
          onPress={() => handleImageClick(item.id)}
          style={[styles.container]}
        >
          <View style={[styles.container, styles.imageContainer]}>
            <Image
              style={styles.smallImage}
              source={{ uri: item.image_url || "" }}
            />
          </View>
        </TouchableHighlight>
      )}
    />
  );
};
