import { Feather } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";

import { queryClient } from "../../../../App";
import { deleteComment } from "../../../apiCalls/deleteComment";
import { IPostComment } from "../../../screens/PlatformMainScreen/PostDetailsScreen/PostDetailsScreen";
import theme from "../../../theme/theme";
import { UserAvatar } from "../../UserAvatar";
import { styles } from "./styles";
export const PostComment = ({
  body,
  commentId,
  creator_uuid,
}: IPostComment) => {
  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      queryClient.invalidateQueries({ queryKey: ["postData"] });
    } catch (error) {
      console.log("Deleting comment went wrong", error);
    }
  };

  return (
    <View style={styles.commentsWrapper} data-test-id={`Comment${commentId}`}>
      <UserAvatar imageSize="tiny" nameOrientation="horizontal" />
      <View style={styles.commentTextWrapper}>
        <Text style={styles.commentText}>{body}</Text>
        <Feather
          onPress={handleDeleteComment}
          name="delete"
          size={24}
          color={theme.colors.error}
        />
      </View>
    </View>
  );
};
