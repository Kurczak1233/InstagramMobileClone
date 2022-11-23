import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { View, Text } from "react-native";

import { getPostsForUser } from "../../apiCalls/getPostsForUser";
import { PostsThreeRowsOverview } from "../../components/Posts";
import { UserAvatar } from "../../components/UserAvatar";
import Header from "../../components/typography/Header";
import { userIdStateContext } from "../../contexts/UserIdContextProvider";
import { DbPost } from "../../types/DbPost";
import { styles } from "./styles";

export const MyTimeLine = () => {
  const { userId } = useContext(userIdStateContext);

  const {
    isLoading,
    error,
    data: userPosts,
  } = useQuery({
    queryKey: ["userPostData", userId],
    queryFn: ({ queryKey }) => getPostsForUser(queryKey[1]),
  });

  console.log(userPosts);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBarWrapper}>
        <UserAvatar
          imageSize="large"
          showUserName={false}
          imageUrl="https://preview.redd.it/vlxyi9pntl541.jpg?width=640&crop=smart&auto=webp&s=901cdbfe9cce6f4e23ec3150b7ed07a1660401a1"
        />
        <View style={styles.myName}>
          <Header variant="h5">Me</Header>
        </View>
      </View>
      <View style={styles.post}>
        <PostsThreeRowsOverview filteredPosts={userPosts as DbPost[]} />
      </View>
    </View>
  );
};
