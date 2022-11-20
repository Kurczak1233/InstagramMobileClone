import { View, Text } from "react-native";

import { IPostComment } from "../../../screens/PlatformMainScreen/PostDetailsScreen/PostDetailsScreen";

export const PostComment = ({ body, id, creator_uuid }: IPostComment) => {
  return (
    <View>
      <Text>{body}</Text>
    </View>
  );
};
