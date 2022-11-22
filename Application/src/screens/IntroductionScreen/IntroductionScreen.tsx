import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Button, Image } from "react-native";

import { RootStackParamList } from "../../components/Navigation/RootStackParamList";
import Header from "../../components/typography/Header";
import theme from "../../theme/theme";
import { styles } from "./styles";

export const IntroductionScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.welcomeContainer}>
      <Header variant="h3" color={theme.colors.primary}>
        Welcome
      </Header>
      <View style={styles.introductionButton}>
        <Button
          title="Start your journey"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
      <Image
        source={{
          uri: "https://img-13.stickers.cloud/packs/cd7d6ffc-b450-4ddd-a725-e376aa71aa6d/webp/4242143c-59d2-4871-a3b9-3448af8dfa65.webp",
        }}
        style={styles.imageBackground}
      />
    </View>
  );
};
