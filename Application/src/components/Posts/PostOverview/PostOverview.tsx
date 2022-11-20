import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";

import theme from "../../../theme/theme";
import { PlatformMainParamList } from "../../Navigation/platformMainParamList";
import Header from "../../typography/Header";
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
          <Header variant="h5" size="60px" color={theme.colors.primary}>
            {description}
          </Header>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
          <Text>14 Likes</Text>
          <Text>Somebody XDXDXDXDXD</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
