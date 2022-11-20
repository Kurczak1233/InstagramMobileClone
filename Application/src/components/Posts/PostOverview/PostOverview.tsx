import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import useNavigateToPostPage from "../../../hooks/useNavigateToPostPage";

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
  const { navigateToPostPage } = useNavigateToPostPage();
  return (
    <View style={styles.imageContainer}>
      <TouchableHighlight
        underlayColor={theme.colors.overlay}
        onPress={() => navigateToPostPage(postId)}
      >
        <View>
          <Header variant="h5" color={theme.colors.primary}>
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
