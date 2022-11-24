import { Avatar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { StackTabsParamList } from "../Navigation/stackTabsParamsList";
import { styles } from "./styles";

type IUserAvatar = {
  userId?: string;
  showUserName?: boolean;
  imageUrl?: string;
  imageSize: "tiny" | "small" | "large";
  nameOrientation?: "horizontal" | "vertical";
};

export const UserAvatar = ({
  userId,
  imageSize,
  imageUrl,
  showUserName = true,
  nameOrientation = "vertical",
}: IUserAvatar) => {
  const navigation = useNavigation<StackNavigationProp<StackTabsParamList>>();
  
  // User data
  // const {
  //   isLoading,
  //   error,
  //   data: user,
  // } = useQuery({
  //   queryKey: ["userAvatar", userId],
  //   queryFn: ({ queryKey }) => getCurrentUser(queryKey[1]),
  // });

  const navigateToUserProfile = () => {
    navigation.navigate("MyTimeLine", { userId: userId || "" });
  };

  return (
    <View
      style={[
        styles.imageContainer,
        styles[nameOrientation],
        {
          minHeight:
            imageSize === "large" ? 100 : imageSize === "tiny" ? 25 : 50,
        },
      ]}
    >
      <TouchableOpacity onPress={navigateToUserProfile}>
        <Avatar
          size={imageSize === "large" ? 100 : imageSize === "tiny" ? 25 : 50}
          image={{ uri: imageUrl }}
          label={showUserName ? "Somebody" : ""}
        />
      </TouchableOpacity>
      {showUserName && <Text style={styles.userName}>Somebody</Text>}
    </View>
  );
};
