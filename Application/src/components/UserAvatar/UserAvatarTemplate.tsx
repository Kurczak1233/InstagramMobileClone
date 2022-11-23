import { Avatar } from "@react-native-material/core";
import { View, Text } from "react-native";

import { styles } from "./styles";

type IUserAvatar = {
  showUserName?: boolean;
  imageUrl?: string;
  imageSize: "tiny" | "small" | "large";
  nameOrientation?: "horizontal" | "vertical";
};

export const UserAvatarTemplate = ({
  imageSize,
  imageUrl,
  showUserName = true,
  nameOrientation = "vertical",
}: IUserAvatar) => {
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
      <Avatar
        size={imageSize === "large" ? 100 : imageSize === "tiny" ? 25 : 50}
        image={{ uri: imageUrl }}
        label={showUserName ? "Somebody" : ""}
      />
      {showUserName && <Text style={styles.userName}>Somebody</Text>}
    </View>
  );
};
