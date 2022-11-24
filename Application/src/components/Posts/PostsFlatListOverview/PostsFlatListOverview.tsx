import React from "react";
import { FlatList } from "react-native";

import { DbPost } from "../../../types/DbPost";
import { PostOverview } from "../PostOverview/PostOverview";

type IPostsFlatListOverview = {
  posts: DbPost[];
};

export const PostsFlatListOverview = ({ posts }: IPostsFlatListOverview) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <PostOverview
          description={item.description || ""}
          imageUrl={item.image_url || ""}
          postId={item.id}
        />
      )}
    />
  );
};
