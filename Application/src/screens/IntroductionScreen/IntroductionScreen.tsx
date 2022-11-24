import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Button, Image } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { RootStackParamList } from "../../components/Navigation/RootStackParamList";
import Header from "../../components/typography/Header";
import theme from "../../theme/theme";
import { styles } from "./styles";

export const IntroductionScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

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
      <Button
        onPress={() => {
          rotation.value = withRepeat(withTiming(10), Infinity, true);
        }}
        title="Move"
      />
      <Image
        source={{
          uri: "https://zapodaj.net/images/cf365ec44b467.png",
        }}
        style={styles.imageBackground}
      />
      <Animated.Image
        source={{
          uri: "https://zapodaj.net/images/801004e713353.png",
        }}
        style={[styles.pawImage, animatedStyles]}
      />
    </View>
  );
};
