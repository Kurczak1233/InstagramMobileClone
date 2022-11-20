import React from "react";
import { View } from "react-native";

import { UserAvatar } from "../../UserAvatar";
import { styles } from "./styles";

export const TopUserBar = () => {
  return (
    <View style={styles.container}>
      <UserAvatar
        imageSize="small"
        showUserName={false}
        imageUrl="https://cms.koty.pl/uploads/28158869_189085605189934_6334436820062830592_n_af5be873fb.jpg"
      />
      <UserAvatar
        imageSize="small"
        showUserName={false}
        imageUrl="https://moderncat.com/wp-content/uploads/2019/03/inset-1-7.jpg"
      />
      <UserAvatar
        imageSize="small"
        showUserName={false}
        imageUrl="https://i.ytimg.com/vi/__JAfhqRS2c/maxresdefault.jpg"
      />
      <UserAvatar
        imageSize="small"
        showUserName={false}
        imageUrl="https://preview.redd.it/vlxyi9pntl541.jpg?width=640&crop=smart&auto=webp&s=901cdbfe9cce6f4e23ec3150b7ed07a1660401a1"
      />
      <UserAvatar
        imageSize="small"
        showUserName={false}
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-aeeaa7mX_aEXMfikB4ERIRaDDk7hRWoA_1rpzYSTMpM9CEERjPvtAhIrSrw9kDiElNQ&usqp=CAU"
      />
    </View>
  );
};
