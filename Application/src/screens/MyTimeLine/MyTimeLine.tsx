import { useRoute, RouteProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { View, Text, Switch } from "react-native";

import { getPostsForUser } from "../../apiCalls/getPostsForUser";
import {
  PostsFlatListOverview,
  PostsThreeRowsOverview,
} from "../../components/Posts";
import { UserAvatar } from "../../components/UserAvatar";
import Body from "../../components/typography/Body";
import Header from "../../components/typography/Header";
import { userIdStateContext } from "../../contexts/UserIdContextProvider";
import theme from "../../theme/theme";
import { DbPost } from "../../types/DbPost";
import { styles } from "./styles";

export type MyTimeLineParams = {
  userId: number;
};

export const MyTimeLine = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const toggleSwitch = () =>
    setIsEnabled((previousState: boolean) => !previousState);
  const { userId } = useContext(userIdStateContext);
  const route = useRoute<RouteProp<Record<string, MyTimeLineParams>, string>>();
  const { userId: receivedUserId } = route.params;
  const {
    isLoading,
    error,
    data: userPosts,
  } = useQuery({
    queryKey: ["userPostData", userId],
    queryFn: ({ queryKey }) => getPostsForUser(queryKey[1]),
    staleTime: Infinity,
  });

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
      <View style={styles.toggleWrapper}>
        <Body variant="large" color={theme.colors.primary}>
          Show columns
        </Body>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b7f1" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={styles.post}>
        {isEnabled ? (
          <PostsThreeRowsOverview filteredPosts={userPosts as DbPost[]} />
        ) : (
          <PostsFlatListOverview posts={userPosts as DbPost[]} />
        )}
      </View>
    </View>
  );
};
