import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";

import { RootStackParamList } from "../components/Navigation/RootStackParamList";

export const IntroductionScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>Welcome</Text>
      <Button
        title="Start your journey"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};
