import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, Button } from "react-native";

import { RootStackParamList } from "../../components/Navigation/RootStackParamList";

export const PlatformMainScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View>
      <Text>You are on the platform!</Text>
      <Button
        title="Start your journey"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};
