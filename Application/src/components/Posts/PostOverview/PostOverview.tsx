import React from "react";
import { View, Text, Image } from "react-native";

import { styles } from "./styles";

type IPostOverview = {
  description: string;
  imageUrl: string;
};

export const PostOverview = ({ description, imageUrl }: IPostOverview) => {
  return (
    <View style={styles.imageContainer}>
      <Text>{description}</Text>
      <Image
        style={styles.image}
        source={{
          uri: imageUrl,
        }}
      />
    </View>
  );
};
