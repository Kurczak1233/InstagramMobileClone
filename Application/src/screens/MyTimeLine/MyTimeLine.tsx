import { View } from "react-native";

import { UserAvatar } from "../../components/UserAvatar";
import Header from "../../components/typography/Header";
import { styles } from "./styles";

export const MyTimeLine = () => {
  return (
    <View style={styles.container}>
      <UserAvatar
        imageSize="large"
        showUserName={false}
        imageUrl="https://preview.redd.it/vlxyi9pntl541.jpg?width=640&crop=smart&auto=webp&s=901cdbfe9cce6f4e23ec3150b7ed07a1660401a1"
      />
      <View style={styles.myName}>
        <Header variant="h5">Me</Header>
      </View>
    </View>
  );
};
