import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { IntroductionScreen } from "./IntroductionScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Introduction" component={IntroductionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
