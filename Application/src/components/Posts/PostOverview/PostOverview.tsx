import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";

import useNavigateToPostPage from "../../../hooks/useNavigateToPostPage";
import theme from "../../../theme/theme";
import { UserAvatar } from "../../UserAvatar";
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
          <View style={styles.description}>
            <View style={styles.likesWrapper}>
              <AntDesign name="like2" size={36} color={theme.colors.primary} />
              {/* The prop below should be received from database in the post list request. Creating workaround for that will be a performance issue */}
              <Text> 14 Likes</Text>
            </View>
            <UserAvatar
              imageSize="tiny"
              nameOrientation="horizontal"
              imageUrl="https://cms.koty.pl/uploads/28158869_189085605189934_6334436820062830592_n_af5be873fb.jpg"
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
