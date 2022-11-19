import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";

import { PlatformMainParamList } from "../../Navigation/platformMainParamList";
import { styles } from "./styles";

type IPostOverview = {
  description: string;
  imageUrl: string;
  postId: number;
};

export const PostOverview = ({
  description,
  imageUrl,
  postId,
}: IPostOverview) => {
  const navigation =
    useNavigation<StackNavigationProp<PlatformMainParamList>>();

  const navigateToPostPage = () => {
    navigation.navigate("PostDetails", { id: postId });
  };

  return (
    <View style={styles.imageContainer}>
      <TouchableHighlight onPress={navigateToPostPage}>
        <View>
          <Text>{description}</Text>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
