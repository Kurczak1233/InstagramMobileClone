import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { IntroductionScreen } from "../../screens/IntroductionScreen";
import { LoginScreen } from "../../screens/LoginScreen";
import { PlatformMainScreen } from "../../screens/PlatformMainScreen/PlatformMainScreen";
import { RegisterScreen } from "../../screens/RegisterScreen";
import { RootStackParamList } from "./RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PlatformMain" component={PlatformMainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
