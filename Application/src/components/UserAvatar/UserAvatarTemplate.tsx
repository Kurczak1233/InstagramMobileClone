import { Avatar } from "@react-native-material/core";
import { View, Text } from "react-native";

import { styles } from "./styles";

type IUserAvatar = {
  showUserName?: boolean;
  imageUrl?: string;
  imageSize: "tiny" | "small" | "large";
};

export const UserAvatarTemplate = ({
  imageSize,
  imageUrl,
  showUserName = true,
}: IUserAvatar) => {
  return (
    <View
      style={[
        styles.imageContainer,
        { minHeight: imageSize === "large" ? 100 : 50 },
      ]}
    >
      <Avatar
        size={imageSize === "large" ? 100 : 50}
        image={{ uri: imageUrl }}
        label={showUserName ? "Somebody" : ""}
      />
      {showUserName && <Text>Somebody</Text>}
    </View>
  );
};
